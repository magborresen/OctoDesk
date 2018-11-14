from giozero import LED
from gpiozero.pins.pidpio import PigPIOFactory
import json

file_loc = "../../user-info.json"


def get_data(json_file):
    data = json.loads(json_file)
    ip = data['IP-Address']

    return ip


def led_turn_on(ip):

    factory = PigPIOFactory(host=ip)
    led = LED(17, pin_factory=factory)
    
