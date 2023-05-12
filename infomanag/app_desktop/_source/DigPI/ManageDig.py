######-------------------------------------------------------------------------------------------######
class ManageDig(object):
    '''
    Esta clase permite crear los Sets para el DigPI, crea el caso de 
    estudio, el escenario operativo, la variación del SystemStages
    y carga los datos de cada elemento 
    Parámetros entrada:
            app: la aplicación de Power Factory. 
    Parámetros salida:
            la instancia de la clase
    '''
    def __init__(self, app):
        self.dict_var = {
            "ElmLod": {"P":"plini", "Q":"qlini"},
            "ElmSym": {"P":"pgini", "Q":"qgini"},
            "ElmGenstat": {"P":"pgini", "Q":"qgini"},
            "ElmTr2":["nntap"],
            "ElmTr3":["n3tap_h", "n3tap_m", "n3tap_l"],
            "ElmLne": "outserv"
        }
        self.sets_name = {
                "GeneralSet_Lineas":"*.ElmLne", 
                "GeneralSet_Trafos":"*.ElmTr*",
                "GeneralSet_Demandas":"*.ElmLod", 
                "GeneralSet_Generadores":"*.ElmSym, *.ElmGenstat"
                }
        self.list_area = ['Antioquia','Caribe',
                        'Nordeste','Oriental',
                        'Suroccidental']
        self.app = app
    
    def create_sets(self):
        '''
        Este método permite crear las listas y retornarlas con los
        elementos (Líneas, Transformadores, demandas y generaciones)
        en un diccionario
        Parámetros entrada:
                None
        Parámetros salida:
                dict_sets : diccionario con los sets creados con las listas 
        '''
        def add_data_sets(classname):
            list_elm = []
            for e in self.app.GetCalcRelevantObjects(classname):
                if (e.cpArea):
                    if (e.cpArea.loc_name in self.list_area):
                        list_elm.append(e)
            return list_elm
        dict_sets = {}
        for name in self.sets_name:
            dict_sets[name] = add_data_sets(self.sets_name.get(name))
        return dict_sets
    
    def create_case_esc(self, fecha):
        '''
        Este método permite crear el nuevo caso de estudio en el cual se va 
        a trabajar con la carga del DigTNA, también crea el escenario operativo
        y la nuevo variación en el SystemStages 
        Parámetros entrada:
                fecha: datetime de python
        Parámetros salida:
                None
        '''
        def create_name(fecha):
            return 'P'+str(fecha.hour)+'_'+str(fecha.minute)\
                    +'_'+str(fecha.second)
        def get_variation(app):
            for e in app.GetProjectFolder("scheme").GetContents():
                if (e.loc_name == "SystemStages"):
                    return e
        esc_fold = self.app.GetProjectFolder("scen")
        study_fold = self.app.GetProjectFolder("study")
        study_dict = dict((e.loc_name.replace('P','').replace('0',''), e)
                    for e in study_fold.GetContents()
                    )
        esc_dict = dict((e.loc_name.replace('P','').replace('0',''), e)
                    for e in esc_fold.GetContents()
                    )
        var_dict = dict((e.loc_name.replace('P','').replace('0',''), e)
                    for e in get_variation(self.app).GetContents()
                    )
        new_name = create_name(fecha)
        new_stud = study_fold.AddCopy(study_dict.get(str(fecha.hour).replace('0', '')), new_name)
        new_esc = esc_fold.AddCopy(esc_dict.get(str(fecha.hour).replace('0', '')), new_name)
        new_var = get_variation(self.app).AddCopy(var_dict.get(str(fecha.hour).replace('0', '')), new_name)
        new_stud.Activate()
        new_esc.Activate()
        var_dict.get(str(fecha.hour).replace('0', '')).Deactivate()
        new_var.Activate()
        new_var.GetContents()[0].loc_name = new_var.loc_name
    
    def create_dgs(self, df, type_, arc):
        '''
        Crea el DGS, que permite cargar los datos a Power Factory, 
        por medio de un dataframe,
        Parámetros entrada:
                df    : dataframe con los datos
                sheet : tipo de elemento 
                arc   : archivo de carga de los datos 
        Parámetros salida:
                arc   : archivo de carga de los datos
        '''
        if (type_=="Cargas"):
            arc.write("$$ElmLod;ID(a:40);outserv(i);plini(r);qlini(r);scale0(r)\n")
            s = "##{fk};{sta};{p};{q};{s}\n"
            for i in range(df.shape[0]):
                try:
                    row = df.iloc[i]
                    arc.write(s.format(
                            fk = row[2],
                            sta = 0,
                            p  = float(row[5]),
                            q  = float(row[6]),
                            s  = 1
                        ))
                except:
                    pass
        elif (type_=="Generadores"):
            arc.write("$$ElmSym;ID(a:40);outserv(i);pgini(r);qgini(r)\n")
            s = "##{fk};{os};{p};{q}\n"
            for i in range(df.shape[0]):
                try:
                    row = df.iloc[i]
                    arc.write(s.format(
                            fk = row[2],
                            os = 0,
                            p  = float(row[5]),
                            q  = float(row[6]),
                        ))
                except:
                    pass
        elif (type_=="Trafos3"):
            s_tr2 = "$$ElmTr2;ID(a:40);outserv(i);nntap(i)\n"
            s2 = "##{fk};{os};{tap}\n"
            l2 = []
            s_tr3 = "$$ElmTr3;ID(a:40);outserv(i);n3tap_m(i);n3tap_h(i)\n"
            s3 = "##{fk};{os};{taph};{tapm}\n"
            l3 = []
            for i in range(df.shape[0]):
                # try:
                    row = df.iloc[i]
                    elm = self.app.SearchObjectByForeignKey(row[2])
                    if (elm.GetClassName()=="ElmTr2"):                        
                        l2.append(s2.format(
                            fk = row[2],
                            os = 0, 
                            tap  = float(row[5]),
                        ))
                    elif (elm.GetClassName()=="ElmTr3"):
                        l3.append(s3.format(
                            fk = row[2],
                            os = 0, 
                            taph  = int(row[5]) if (int(elm.GetAttribute("e:n3tap_h"))!=0) else '',
                            tapm  = int(row[5]) if (int(elm.GetAttribute("e:n3tap_m"))!=0) else '',
                        ))
                # except:
                #     pass
            arc.write(s_tr2)
            for e in l2:
                arc.write(e)
            arc.write("\n\n")
            arc.write(s_tr3)
            for e in l3:
                arc.write(e)
        elif (type_=="Lineas"):
            arc.write("$$ElmLne;ID(a:40);outserv(i)\n")
            s = "##{fk};{os}\n"
            for i in range(df.shape[0]):
                try:
                    row = df.iloc[i]
                    arc.write(s.format(
                            fk = row[2],
                            os = 0 if (row[4]=="Energ") else 1,
                        ))
                except:
                    pass
        return arc
    
    def add_values(self, list_df):
        '''
        Carga los datos elemento a elemento, utilizando
        SearchObjectByForeignKey lo que implica que se deben 
        traer los datos en el dataframe con el Fkey de cada 
        elemento y el valor a actualizar, 
        Parámetros entrada:
                df    : dataframe con los datos 
        Parámetros salida:
                None
        '''
        def assign_data_trf(elm, row):
            if (str(row.get("STATUS"))=="Energ"):
                elm.outserv = 0 
            elif (str(row.get("STATUS")) in ["Deenerg","Grounded"] ):
                elm.outserv = 1

        def assign_data_gen(elm, row, class_name):
            if str(row.get("P"))[0].isnumeric():
                elm.SetAttribute(
                    self.dict_var.get(class_name).get("P"), 
                    float(row.get("P"))
                )
                elm.SetAttribute(
                    self.dict_var.get(class_name).get("Q"), 
                    float(row.get("Q"))
                )
            else:
                self.app.PrintPlain(elm)
        def assign_data_lod(elm, row, class_name):
            if str(row.get("P"))[0].isnumeric():
                elm.SetAttribute(
                    self.dict_var.get(class_name).get("P"), 
                    float(row.get("P"))
                )
                elm.SetAttribute(
                    self.dict_var.get(class_name).get("Q"), 
                    float(row.get("Q"))
                )
        def assign_data_line(elm, row, class_name):
            def terminal_outserv(bus, status): 
                if (len(bus.GetContents())):
                    bus.GetContents()[0].on_off = \
                        1 if ('CL' in status.upper()) else 0
                else:
                    for e in bus.cterm.GetContents():
                        if (e.obj_id):
                            if (e.obj_id.GetClassName()=="ElmCoup" 
                                and e.obj_id.aUsage=="cbk"):
                                e.obj_id.on_off = \
                                    1 if ('CL' in status.upper()) else 0
            status = str(row.get("STATUS"))
            if (elm.bus1):
                terminal_outserv(elm.bus1, status[:4])
            if (elm.bus2):
                terminal_outserv(elm.bus2, status[4:])
        for df in list_df:
            for i in range(df.shape[0]):
                row = df.iloc[i]
                elm = self.app.SearchObjectByForeignKey(row[2]) 
                if (elm):
                    class_name = elm.GetClassName()
                    if (elm.GetClassName() in ["ElmTr2","ElmTr3"]):
                        assign_data_trf(elm, row)
                    if (elm.GetClassName() in ["ElmSym", "ElmGenstat"]):
                        assign_data_gen(elm, row, class_name)
                    elif (elm.GetClassName()=="ElmLod"):
                        assign_data_lod(elm, row, class_name) 
                    elif  (elm.GetClassName()=="ElmLne"):
                        assign_data_line(elm, row, class_name)
                else:
                    self.app.PrintPlain(elm) 
    
    def assign_inter(self, import_flag=True, pot_p=0, pot_q=0):
        '''
        Este método permite asignar los valores de intecambio con Ecuador 
        recibe los valores de intecambio en P y Q y los asigna al generador 
        ficticio o la carga ficticia de Ecuador. Esto con el fin de evidenciar
        el intecambio de Colombia a Ecuador o viceversa. 
        Parámetros entrada:
                import_flag:  bandera que permite determinat si se 
                              importa True o exporta False 
                pot_p:        potencia activa del intercambio
                pot_q:        potencia reactiva del intercambio. 
        Parámetros salida:
                None
        '''

        dict_fkey = {
            "list_fkey_no_change":[
                    "LinJmdPim21","LinJmdPim22",
                    "LinJmdPim23","LinJmdPim24",
                    "L_PimPom21","L_PimPom22",
                    "L_PimPom23","L_PimPom24",
                    #Pimampiro
                    "B_PIM_2_2",	"B_PIM_2_T22",
                    "B_PIM_2_3",	"B_PIM_2_T23",
                    "B_PIM_2_4",	"B_PIM_2_T24",
                    "B_PIM_2_5",	"B_PIM_2_T25",
                    "B_PIM_2_6",	"B_PIM_2_T26",
                    "B_PIM_2_7",	"B_PIM_2_T27",
                    "B_PIM_2_8",	"B_PIM_2_T28",
                    "B_PIM_2_9",	"B_PIM_2_T29",
                    "B_PIM_2_T10",	"B_PIM_2_T30",
                    "B_PIM_2_T11",	"B_PIM_2_T31",
                    "B_PIM_2_T12",	"B_PIM_2_T32",
                    "B_PIM_2_T13",	"B_PIM_2_T33",
                    "B_PIM_2_T14",	"B_PIM_2_T34",
                    "B_PIM_2_T15",	"B_PIM_2_T35",
                    "B_PIM_2_T16",	"B_PIM_2_T36",
                    "B_PIM_2_T17",	"B_PIM_2_T37",
                    "B_PIM_2_T18",	"B_PIM_2_T38",
                    "B_PIM_2_T19",	"B_PIM_2_T7",
                    "B_PIM_2_T20",	"B_PIM_2_T8",
                    "B_PIM_2_T21",	"B_PIM_2_T9",
                    #Lo que ya estaba
                    "B_PIM_2_B1", "B_PIM_2_B2",
                    "B_POM_2_B1","B_POM_2_B2",
                    "B_POM_2_13","B_POM_2_5",
                    "B_POM_2_6","B_POM_2_7",
                    "B_POM_2_8","B_POM_2_9",
                    "B_POM_2_T19","B_POM_2_T20",
                    "B_POM_2_T21","B_POM_2_T22",
                    "B_POM_2_T23","B_POM_2_T24",
                    "B_POM_2_T25","B_POM_2_T26",
                    "B_POM_2_T27","B_POM_2_T28",
                    "B_POM_2_T29","B_POM_2_T30",
                    "B_POM_2_T31","B_POM_2_T32",
                    "B_POM_2_T33","B_POM_2_T34",
                    "B_POM_2_T35","B_POM_2_T36",
                    "B_POM_2_T37","B_POM_2_T38",
                    "B_POM_2_T51","B_POM_2_T52",
                    "B_POM_2_T53","B_POM_2_T54"
                ],
            "list_fkey_gen": [
                    "POM_GFi",
                    "POM_52-2GFi2",
                    "POM_89-2GFi1",
                    "POM_89-2GFi3",
                    "POM_89-2GFi9"
                ],
            "list_fkey_lod": [
                    "POM_CFi",
                    "POM_89-2CFi3",
                    "POM_52-2CFi2",
                    "POM_89-2CFi9",
                    "POM_89-2CFi9"
                ]
        }
        for elm in self.app.GetCalcRelevantObjects('*.ElmLne, \
                                                    *.ElmTerm, \
                                                    *.ElmTr*, \
                                                    *.ElmSubstat,\
                                                    *.ElmSym,\
                                                    *.ElmGenstat,\
                                                    *.ElmLod'):
            if (elm.dat_src!="MAN" and not(elm.for_name in\
                    dict_fkey.get("list_fkey_no_change"))):
                elm.outserv = 1
        def assing_on_off(list_f_key):
            for f_key in list_f_key:
                elm = self.app.SearchObjectByForeignKey(f_key) 
                elm.on_off = 1
        if (import_flag):
            assing_on_off(dict_fkey.get("list_fkey_gen"))
            elm_gen = self.app.SearchObjectByForeignKey("gFicPom") 
            elm_gen.outserv = 0
            elm_gen.pgini = pot_p
            elm_gen.qgini = pot_q
        else:
            assing_on_off(dict_fkey.get("list_fkey_lod"))
            elm_lod = self.app.SearchObjectByForeignKey("CrgPqi21")
            elm_lod.outserv = 0 
            elm_lod.plini = pot_p
            elm_lod.qlini = pot_q
