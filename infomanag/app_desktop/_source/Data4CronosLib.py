# -*- coding: utf-8 -*-
"""
Created on Sat Dec 12 21:44:29 2022

Clase utilizada convertir la información que viene de Power Factory en una ficticia.
- Esta clase funciona desde el lado del Frontend.
- Se cambiar lso elementos de tipo Class Power Factory a Ficticia Power Factory .
- Se reciben los parámetros desde Power Factory y se transforman 
- Se envian transformados en la clase ficticia 

"""

class dataConvert():
    """
       Esta clase sirve para cambair los elementos de la clase de Power Factory en una clase ficticia 
       que emula la de Power Factoy en las variables loc_name, for_name y el método GetClassName()
       
       Paramenters:
            pf_element
    """
    def __init__(self, pf_elemet):
        self.loc_name = pf_elemet.loc_name
        self.for_name = pf_elemet.for_name
        self.class_name = pf_elemet.GetClassName()
    def GetClassName(self):
        return self.class_name


import powerfactory
app = powerfactory.GetApplication()
elm = app.SearchObjectByForeignKey("CI0454")
app.PrintPlain(elm)
app.PrintPlain(type(elm))

elm_c = dataConvert(elm)
app.PrintPlain(type(elm_c))
app.PrintPlain(elm_c.loc_name)
app.PrintPlain(elm_c.for_name)
app.PrintPlain(elm_c.GetClassName())





