import serial
import struct
import time
from models import Session, TelemetryData

# Configure serial port
ser = serial.Serial('COM7', 115200, timeout=1)

#global variable for previous data
prev_data = TelemetryData(
        relay_state=0,
        failsafe_status=0,
        fan_speed=0,
        faults_1=0,
        faults_2=0,
        pack_ccl=0,
        pack_dcl=0,
        pack_current=0,
        avg_pack_current=0,
        pack_voltage=0,
        pack_summed_voltage=0,
        pack_soc=0,
        pack_amphours=0,
        pack_health=0,
        adaptive_soc=0,
        adaptive_amphours=0,
        high_temperature=0,
        low_temperature=0,
        avg_temperature=0,
        high_cell_voltage=0,
        low_cell_voltage=0,
        avg_cell_voltage=0,
        pack_resistance=0,
        avg_cell_resistance=0,
        pack_kw_power=0,
)

def insert_data(data):
    global prev_data
    
    session = Session()
    new_entry = TelemetryData(
        relay_state=data.get("relay_state") if data.get("relay_state") is not None else prev_data.relay_state,
        failsafe_status=data.get("failsafe_status") if data.get("failsafe_status") is not None else prev_data.failsafe_status,
        fan_speed=data.get("fan_speed") if data.get("fan_speed") is not None else prev_data.fan_speed, 
        faults_1=data.get("faults_1") if data.get("faults_1") is not None else prev_data.faults_1, 
        faults_2=data.get("faults_2") if data.get("faults_2") is not None else prev_data.faults_2, 
        pack_ccl=data.get("pack_ccl") if data.get("pack_ccl") is not None else prev_data.pack_ccl, 
        pack_dcl=data.get("pack_dcl") if data.get("pack_dcl") is not None else prev_data.pack_dcl, 
        pack_current=data.get("pack_current") if data.get("pack_current") is not None else prev_data.pack_current, 
        avg_pack_current=data.get("avg_pack_current") if data.get("avg_pack_current") is not None else prev_data.avg_pack_current, 
        pack_voltage=data.get("pack_voltage") if data.get("pack_voltage") is not None else prev_data.pack_voltage, 
        pack_summed_voltage=data.get("pack_summed_voltage") if data.get("pack_summed_voltage") is not None else prev_data.pack_summed_voltage, 
        pack_soc=data.get("pack_soc") if data.get("pack_soc") is not None else prev_data.pack_soc, 
        pack_amphours=data.get("pack_amphours") if data.get("pack_amphours") is not None else prev_data.pack_amphours, 
        pack_health=data.get("pack_health") if data.get("pack_health") is not None else prev_data.pack_health, 
        adaptive_soc=data.get("adaptive_soc") if data.get("adaptive_soc") is not None else prev_data.adaptive_soc, 
        adaptive_amphours=data.get("adaptive_amphours") if data.get("adaptive_amphours") is not None else prev_data.adaptive_amphours, 
        high_temperature=data.get("high_temperature") if data.get("high_temperature") is not None else prev_data.high_temperature, 
        low_temperature=data.get("low_temperature") if data.get("low_temperature") is not None else prev_data.low_temperature, 
        avg_temperature=data.get("avg_temperature") if data.get("avg_temperature") is not None else prev_data.avg_temperature, 
        high_cell_voltage=data.get("high_cell_voltage") if data.get("high_cell_voltage") is not None else prev_data.high_cell_voltage, 
        low_cell_voltage=data.get("low_cell_voltage") if data.get("low_cell_voltage") is not None else prev_data.low_cell_voltage, 
        avg_cell_voltage=data.get("avg_cell_voltage") if data.get("avg_cell_voltage") is not None else prev_data.avg_cell_voltage, 
        pack_resistance=data.get("pack_resistance") if data.get("pack_resistance") is not None else prev_data.pack_resistance, 
        avg_cell_resistance=data.get("avg_cell_resistance") if data.get("avg_cell_resistance") is not None else prev_data.avg_cell_resistance, 
        pack_kw_power=data.get("pack_kw_power") if data.get("pack_kw_power") is not None else prev_data.pack_kw_power, 
    )
    
    #do this to avoid aliasing, unless new_entry being aliased doesn't matter? then you can just do: prev_data = new_entry
    prev_data = TelemetryData(
        relay_state=data.get("relay_state") if data.get("relay_state") is not None else prev_data.relay_state,
        failsafe_status=data.get("failsafe_status") if data.get("failsafe_status") is not None else prev_data.failsafe_status,
        fan_speed=data.get("fan_speed") if data.get("fan_speed") is not None else prev_data.fan_speed, 
        faults_1=data.get("faults_1") if data.get("faults_1") is not None else prev_data.faults_1, 
        faults_2=data.get("faults_2") if data.get("faults_2") is not None else prev_data.faults_2, 
        pack_ccl=data.get("pack_ccl") if data.get("pack_ccl") is not None else prev_data.pack_ccl, 
        pack_dcl=data.get("pack_dcl") if data.get("pack_dcl") is not None else prev_data.pack_dcl, 
        pack_current=data.get("pack_current") if data.get("pack_current") is not None else prev_data.pack_current, 
        avg_pack_current=data.get("avg_pack_current") if data.get("avg_pack_current") is not None else prev_data.avg_pack_current, 
        pack_voltage=data.get("pack_voltage") if data.get("pack_voltage") is not None else prev_data.pack_voltage, 
        pack_summed_voltage=data.get("pack_summed_voltage") if data.get("pack_summed_voltage") is not None else prev_data.pack_summed_voltage, 
        pack_soc=data.get("pack_soc") if data.get("pack_soc") is not None else prev_data.pack_soc, 
        pack_amphours=data.get("pack_amphours") if data.get("pack_amphours") is not None else prev_data.pack_amphours, 
        pack_health=data.get("pack_health") if data.get("pack_health") is not None else prev_data.pack_health, 
        adaptive_soc=data.get("adaptive_soc") if data.get("adaptive_soc") is not None else prev_data.adaptive_soc, 
        adaptive_amphours=data.get("adaptive_amphours") if data.get("adaptive_amphours") is not None else prev_data.adaptive_amphours, 
        high_temperature=data.get("high_temperature") if data.get("high_temperature") is not None else prev_data.high_temperature, 
        low_temperature=data.get("low_temperature") if data.get("low_temperature") is not None else prev_data.low_temperature, 
        avg_temperature=data.get("avg_temperature") if data.get("avg_temperature") is not None else prev_data.avg_temperature, 
        high_cell_voltage=data.get("high_cell_voltage") if data.get("high_cell_voltage") is not None else prev_data.high_cell_voltage, 
        low_cell_voltage=data.get("low_cell_voltage") if data.get("low_cell_voltage") is not None else prev_data.low_cell_voltage, 
        avg_cell_voltage=data.get("avg_cell_voltage") if data.get("avg_cell_voltage") is not None else prev_data.avg_cell_voltage, 
        pack_resistance=data.get("pack_resistance") if data.get("pack_resistance") is not None else prev_data.pack_resistance, 
        avg_cell_resistance=data.get("avg_cell_resistance") if data.get("avg_cell_resistance") is not None else prev_data.avg_cell_resistance, 
        pack_kw_power=data.get("pack_kw_power") if data.get("pack_kw_power") is not None else prev_data.pack_kw_power, 
    )
    
    session.add(new_entry)
    session.commit()
    session.close()
    
    
    print(f"Inserted data: {data}")
    print(f"New entry: {new_entry.__dict__}")

def parse_can_message(can_id, data_bytes):
    """ Parse CAN message based on message ID """
    data = {}

    if can_id == 0x6B2:
        data["relay_state"] = data_bytes[0]
        data["failsafe_status"] = data_bytes[2]
        data["fan_speed"] = data_bytes[4]
        data["faults_1"] = data_bytes[5]
    
    elif can_id == 0x6B3:
        data["faults_2"] = data_bytes[0]
        data["pack_ccl"] = struct.unpack(">H", bytes(data_bytes[2:4]))[0] / 10.0
        data["pack_dcl"] = struct.unpack(">H", bytes(data_bytes[4:6]))[0] / 10.0

    elif can_id == 0x6B4:
        data["pack_current"] = struct.unpack(">h", bytes(data_bytes[0:2]))[0] / 10.0
        data["avg_pack_current"] = struct.unpack(">h", bytes(data_bytes[2:4]))[0] / 10.0
        data["pack_voltage"] = struct.unpack(">H", bytes(data_bytes[4:6]))[0] / 10.0

    elif can_id == 0x6B5:
        data["pack_summed_voltage"] = struct.unpack(">H", bytes(data_bytes[0:2]))[0] / 10.0
        data["pack_soc"] = data_bytes[2] / 2.0
        data["pack_amphours"] = struct.unpack(">H", bytes(data_bytes[3:5]))[0] / 10.0
        data["pack_health"] = data_bytes[5]

    elif can_id == 0x6B6:
        data["adaptive_soc"] = data_bytes[0] / 2.0
        data["adaptive_amphours"] = struct.unpack(">H", bytes(data_bytes[1:3]))[0] / 10.0
        data["high_temperature"] = data_bytes[4]
        data["low_temperature"] = data_bytes[6]

    elif can_id == 0x6B7:
        data["avg_temperature"] = data_bytes[0]
        data["high_cell_voltage"] = struct.unpack(">H", bytes(data_bytes[2:4]))[0] / 1000.0
        data["low_cell_voltage"] = struct.unpack(">H", bytes(data_bytes[5:7]))[0] / 1000.0

    elif can_id == 0x6B8:
        data["avg_cell_voltage"] = struct.unpack(">H", bytes(data_bytes[0:2]))[0] / 1000.0
        data["pack_resistance"] = struct.unpack(">H", bytes(data_bytes[2:4]))[0] / 1000.0
        data["avg_cell_resistance"] = struct.unpack(">H", bytes(data_bytes[3:5]))[0] / 1000.0

    elif can_id == 0x6BA:
        data["pack_kw_power"] = struct.unpack(">H", bytes(data_bytes[2:4]))[0] / 10.0


    print(data)
    return data

while True:
    try:
        # Read raw CAN frame
        line = ser.readline().decode('utf-8').strip()
        if line:
            parts = line.split(',')
            can_id = int(parts[0], 16)
            data_bytes = [int(x, 16) for x in parts[1:]]

            parsed_data = parse_can_message(can_id, data_bytes)
            if parsed_data:
                insert_data(parsed_data)

    except KeyboardInterrupt:
        print("Program interrupted")
        break
    except Exception as e:
        print(f"Error: {e}")
        break

ser.close()