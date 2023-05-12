import sys
from unittest import result

pf_app = None

def init(action, data):
    try:
        sys.path.append(r"%s"%data['path'])
        import powerfactory
        ##-------- Power Factory -------- ##
        global pf_app
        pf_app=powerfactory.GetApplicationExt()
        result = {"action":action, "msg": "Conexión Exitosa con Power Fatory", "data":None}
        return {"res":result}, 200
    except RuntimeError:
        result = {"action":action, "msg": "Conexión Exitosa con Power Fatory", "data":None}
        return {"res":result}, 200
    except:
        result = {"action":action, "msg":"Error en la conexión"}
        return {"res":result}, 500
def get_prj(action, data):
    try:
        global pf_app
        list_prj = []
        user = pf_app.GetCurrentUser()
        i=0
        for elm in user.GetContents():
            if (elm.GetClassName()=="IntPrj" 
                and data["name"].lower() in elm.loc_name.lower()):
                list_prj.append({"id":i,"name":elm.loc_name})
                i+=1
            elif elm.GetClassName()=="IntFolder":
                for e in elm.GetContents():
                    if (e.GetClassName()=="IntPrj" 
                        and data["name"].lower() in e.loc_name.lower()):
                        list_prj.append({"id":i,"name":e.loc_name})
                        i+=1
        result = {"action":action, "msg": "", "data":list_prj}
        return {"res":result}, 200
    except:
        result = {"action":action, "msg":"Error al obtener los proyectos"}
        return {"res":result}, 500
def show(action, data):
    global pf_app
    pf_app.Show()
    result = {"action":action, "msg":"Aplicación de Power Factory Abierta", "data":None}
    return {"res":result}, 200
def hide(action, data):
    global pf_app
    pf_app.Hide()
    result = {"action":action, "msg":"Aplicación de Power Factory Cerrada", "data":None}
    return {"res":result}, 200

def main_pf(server_data):
    action = server_data.get('action')
    data = server_data.get('data')
    if (action=='show'):
        return show(action, data)
    if (action=='hide'):
        return hide(action, data)
    if (action=='activar_pf'):
        return init(action, data)
    if (action=='get_projects'):
        return get_prj(action, data)