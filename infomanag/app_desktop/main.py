# importamos librerías locales
from _source.main_window import main, structure
from _source.main_server import run_server

# importamos librerías
from threading import Thread
from random import choice
from string import ascii_lowercase

## inicializamos la interfaz gráfica
window = main()

# creamos el codigo para permitir conexión
lenght_code = 12
values = ascii_lowercase+'1234567890'
code = ''.join(choice(
    values) for _ in range(lenght_code)
    )

## crear estructura de la interfaz
structure(window, code)

# iniciamos le hilo de la interfaz
def run(code):
    # runserver
    run_server(code)
thread_interfaz = Thread(target=run, args=(code,))
thread_interfaz.start()

# mostramos la interfaz gráfica
window.mainloop()


