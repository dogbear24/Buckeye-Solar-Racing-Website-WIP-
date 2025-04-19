from sqlalchemy import create_engine, Column, Integer, Float, DateTime
from sqlalchemy.orm import declarative_base, sessionmaker
import datetime

Base = declarative_base()

class TelemetryData(Base):
    __tablename__ = "telemetry_data"

    id = Column(Integer, primary_key=True, autoincrement=True)
    timestamp = Column(DateTime, default=datetime.datetime.utcnow)

    # Data fields based on CAN message format
    relay_state = Column(Integer)
    failsafe_status = Column(Integer)
    fan_speed = Column(Integer)
    faults_1 = Column(Integer)
    faults_2 = Column(Integer)
    pack_ccl = Column(Float)
    pack_dcl = Column(Float)
    pack_current = Column(Float)
    avg_pack_current = Column(Float)
    pack_voltage = Column(Float)
    pack_summed_voltage = Column(Float)
    pack_soc = Column(Float)
    pack_amphours = Column(Float)
    pack_health = Column(Integer)
    adaptive_soc = Column(Float)
    adaptive_amphours = Column(Float)
    high_temperature = Column(Float)
    low_temperature = Column(Float)
    avg_temperature = Column(Float)
    high_cell_voltage = Column(Float)
    low_cell_voltage = Column(Float)
    avg_cell_voltage = Column(Float)
    pack_resistance = Column(Float)
    avg_cell_resistance = Column(Float)
    pack_kw_power = Column(Float)

# Create SQLite database
engine = create_engine("sqlite:///telemetry.db")
Base.metadata.create_all(engine)

# Create session factory
Session = sessionmaker(bind=engine)