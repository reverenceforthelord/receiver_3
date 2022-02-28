radio.onReceivedString(function (receivedString) {
    if (receivedString == "A") {
        start = 1
        pins.digitalWritePin(DigitalPin.P1, 1)
        pins.digitalWritePin(DigitalPin.P2, 0)
    }
    if (receivedString == "B") {
        start = 0
        pins.digitalWritePin(DigitalPin.P1, 1)
        pins.digitalWritePin(DigitalPin.P2, 1)
    }
})
radio.onReceivedValue(function (name, value) {
    if (name == "x") {
        acc_x = value
    }
    if (name == "y") {
        acc_y = value
        if (direction * acc_y < 0) {
            direction = direction * -1
            if (direction == 1) {
                pins.digitalWritePin(DigitalPin.P1, 1)
                pins.digitalWritePin(DigitalPin.P2, 0)
            } else {
                pins.digitalWritePin(DigitalPin.P1, 0)
                pins.digitalWritePin(DigitalPin.P2, 1)
            }
        }
    }
})
let acc_y = 0
let acc_x = 0
let direction = 0
let start = 0
radio.setGroup(1)
let right_angle = 95
let angle_range = 30
let angle = right_angle
start = 0
direction = 1
pins.digitalWritePin(DigitalPin.P1, 0)
pins.digitalWritePin(DigitalPin.P2, 0)
basic.forever(function () {
    while (start == 1) {
        angle = right_angle + pins.map(
        acc_x,
        -1024,
        1023,
        0 - angle_range,
        angle_range
        )
        pins.servoWritePin(AnalogPin.P8, angle)
        pins.analogWritePin(AnalogPin.P0, Math.abs(acc_y))
    }
})
