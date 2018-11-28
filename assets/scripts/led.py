from giozero import LED
from gpiozero.pins.pidpio import PigPIOFactory
import json

file_loc = "../../user-info.json"
factory = PigPIOFactory(host=ip)
led = LED(17, pin_factory=factory)


def get_data(json_file):
    data = json.loads(json_file)
    ip = data['IP-Address']

    return ip


def toggle_led(ip):

    if led.is_lit():
        led.off()
    else:
        led.on()


toggle_led(get_data(file_loc))
