# internlas libraries
from tkinter import Tk, Label, Text, StringVar, END, Button
from .main_pf import main_pf
# external libreries
import pyperclip as pc
from time import sleep
from requests import post
from threading import Thread

# global variables
sv = None
server_data = None
result, status = None, None

def main(title='Local Backend', geometry='400x410'):
    """
    Esta función permite crear la interfaz principal
    input: 
        title: interface title
        geometry: width, heigth
    output: 
        Tkinter interface
    """
    window = Tk()
    window.title(title)
    window.geometry(geometry)
    window.resizable(width=False, height=False)
    return window

def structure(window, code):
    """
    Esta función permite crear los botones y etiquetas de la interfaz
    input: 
        windows interface
    output: 
        none
    """
    # 
    Label(window, 
        text="Local DigServer",
        font=("Arial", 22)
        ).place(relx=0.25, rely=0.005)
    Label(window, 
        text="Output windows",
        font=("Arial", 12)
        ).place(x=15, y=47)
    Label(window, 
        text=' %s '%code,
        borderwidth=2, relief="groove",
        font=("Arial", 14),
        fg="green"
        ).place(x=150, y=44)
    def change_btn_name():
        """
            Esta función devuelve el nombre del boton a su valor original 
            input: 
                none
            output: 
                none
        """
        sleep(1)
        btn_text.set("Copiar code")
        btn_code['state'] = 'normal'
        btn_code['bg'] = '#53f5f0'
    def btn_copy_code():
        """
            Esta función permite copiar en el clickboard el código 
            input: 
                none
            output: 
                none
        """
        pc.copy(code)
        btn_text.set("Copiado!")
        btn_code['state'] = 'disabled'
        btn_code['bg'] = '#58f869'
        # hilo dedicado a volver el texto del boton a su nombre original
        thread_btn = Thread(target=change_btn_name, args=())
        thread_btn.start()
    btn_text = StringVar()
    btn_text.set("Copiar code")
    btn_code = Button(window, textvariable=btn_text, command=btn_copy_code, bg='#53f5f0')
    btn_code.place(x=300, y=45)
        
    def callback(sv):
        """
            Esta función se ejecuta cada que cambia la variable sv
            y permite la conexión con el script de Power Factory
            input: 
                none
            output: 
                none
        """
        global server_data, result, status
        if (server_data.get('key')):
            result, status = main_pf(server_data)
        output.insert(END, "%s\n"%sv.get())

    global sv
    sv = StringVar()
    sv.trace("w", lambda name, index, mode, sv=sv: callback(sv))
    
    output = Text(window, width=45, height=20)
    output.place(x=15, y=75)
    
    # get close windows
    def close_window():
        """
            Esta función permite capturar el cierre de la interfaz 
            para cerrar el servidor. 
            input: 
                none
            output: 
                none
        """
        try:
            post('http://%s:%s/%s'%(
                '127.0.0.51',
                '5013',
                'shutdown'), 
                json={"code": code}
                )
        except:
            pass
        window.destroy()
    window.protocol("WM_DELETE_WINDOW", close_window)

def update_sv(text, request):
    """
    Esta función permite conectar el servidor con la interfaz
    input: 
        text: texto a escribir enla interfaz
        request: datos que llegan desde el servidor 
              para transferir a Power Facotry.
    output: 
        none
    """
    global sv, server_data, result, status
    server_data = request
    sv.set(text)
    return result, status