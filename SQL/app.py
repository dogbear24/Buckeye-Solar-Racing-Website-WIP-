from flask import Flask, jsonify
from flask_cors import CORS
from models import Session, TelemetryData

app = Flask(__name__)
CORS(app)

def serialize_entry(entry):
    """Convert SQLAlchemy object to a dictionary, excluding internal attributes."""
    return {
        "timestamp": entry.timestamp.isoformat(),
        "relay_state": entry.relay_state,
        "failsafe_status": entry.failsafe_status,
        "fan_speed": entry.fan_speed,
        "faults_1": entry.faults_1,
        "faults_2": entry.faults_2,
        "pack_ccl": entry.pack_ccl,
        "pack_dcl": entry.pack_dcl,
        "pack_current": entry.pack_current,
        "avg_pack_current": entry.avg_pack_current,
        "pack_voltage": entry.pack_voltage,
        "pack_summed_voltage": entry.pack_summed_voltage,
        "pack_soc": entry.pack_soc,
        "pack_amphours": entry.pack_amphours,
        "pack_health": entry.pack_health,
        "adaptive_soc": entry.adaptive_soc,
        "adaptive_amphours": entry.adaptive_amphours,
        "high_temperature": entry.high_temperature,
        "low_temperature": entry.low_temperature,
        "avg_temperature": entry.avg_temperature,
        "high_cell_voltage": entry.high_cell_voltage,
        "low_cell_voltage": entry.low_cell_voltage,
        "avg_cell_voltage": entry.avg_cell_voltage,
        "pack_resistance": entry.pack_resistance,
        "avg_cell_resistance": entry.avg_cell_resistance,
        "pack_kw_power": entry.pack_kw_power
    }

@app.route('/api/latest', methods=['GET'])
def get_latest():
    session = Session()
    latest_entry = session.query(TelemetryData).order_by(TelemetryData.timestamp.desc()).first()
    session.close()

    if latest_entry:
        return jsonify(serialize_entry(latest_entry))
    return jsonify({"error": "No data found"}), 404

if __name__ == '__main__':
    app.run(debug=True, host="0.0.0.0")