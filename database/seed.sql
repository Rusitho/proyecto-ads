USE sistema_incidentes;

-- Categorias
INSERT INTO categoria (categoria_id, nombre) VALUES
(1,'Accidente de tránsito'),(2,'Incidente operacional'),(3,'Agresión / Seguridad ciudadana'),
(4,'Falla mecánica'),(5,'Caída de pasajero'),(6,'Emergencia médica'),
(7,'Daño a infraestructura'),(8,'Incendio / Amago'),(9,'Robo / Hurto'),(10,'Otros');

-- Subcategorias
INSERT INTO subcategoria (subcategoria_id, categoria_id, nombre) VALUES
(1,1,'Choque por alcance'),(2,1,'Choque lateral'),(3,1,'Choque frontal'),(4,1,'Volcadura'),(5,1,'Atropello'),(6,1,'Choque contra objeto fijo'),
(7,2,'Apertura de puertas en movimiento'),(8,2,'Cierre de puertas con pasajero'),(9,2,'Arranque brusco'),(10,2,'Frenada brusca'),(11,2,'Desvío de ruta'),(12,2,'Exceso de velocidad'),
(13,3,'Agresión física entre pasajeros'),(14,3,'Agresión a conductor'),(15,3,'Agresión a orientador'),(16,3,'Acoso sexual'),(17,3,'Vandalismo'),
(18,4,'Falla de frenos'),(19,4,'Falla de dirección'),(20,4,'Falla eléctrica'),(21,4,'Falla de puertas'),(22,4,'Fuga de combustible'),
(23,5,'Caída al interior del bus'),(24,5,'Caída al subir'),(25,5,'Caída al bajar'),(26,5,'Caída en estación'),
(27,6,'Desmayo'),(28,6,'Crisis convulsiva'),(29,6,'Paro cardíaco'),(30,6,'Trabajo de parto'),(31,6,'Crisis de ansiedad'),
(32,7,'Daño a estación'),(33,7,'Daño a señalización'),(34,7,'Daño a torniquete'),(35,7,'Daño a puerta de estación'),
(36,8,'Amago en motor'),(37,8,'Incendio en bus'),(38,8,'Incendio en estación'),
(39,9,'Robo a pasajero en bus'),(40,9,'Robo a pasajero en estación'),(41,9,'Hurto de componentes del bus'),
(42,10,'Objeto abandonado'),(43,10,'Derrame de sustancia'),(44,10,'Otro no clasificado');

-- Tipos de lesion
INSERT INTO tipo_lesion (tipo_lesion_id, nombre) VALUES
(1,'Contusión'),(2,'Fractura'),(3,'Herida cortante'),(4,'Herida contusa'),(5,'Esguince'),
(6,'Luxación'),(7,'Quemadura'),(8,'Traumatismo craneoencefálico'),(9,'Politraumatismo'),
(10,'Abrasión / Raspadura'),(11,'Sin lesión aparente'),(12,'Por determinar');

-- Origenes
INSERT INTO origen (origen_id, nombre) VALUES
(1,'Bus articulado'),(2,'Bus patrón'),(3,'Bus alimentador'),(4,'Vehículo particular'),
(5,'Peatón'),(6,'Infraestructura'),(7,'Tercero'),(8,'Causas naturales'),(9,'Por determinar');

-- Evaluacion de riesgo
INSERT INTO evaluacion_riesgo (riesgo_id, nivel) VALUES
(1,'Leve'),(2,'Moderado'),(3,'Grave'),(4,'Muy grave'),(5,'Fatal');

-- Estaciones
INSERT INTO estacion (estacion_id, nombre) VALUES
(1,'Naranjal'),(2,'Izaguirre'),(3,'Pacífico'),(4,'Independencia'),(5,'Los Jazmines'),
(6,'Tomás Valle'),(7,'El Milagro'),(8,'Honorio Delgado'),(9,'UNI'),(10,'Parque del Trabajo'),
(11,'Caquetá'),(12,'2 de Mayo'),(13,'Quilca'),(14,'España'),(15,'Central'),
(16,'Colmena'),(17,'Jirón de la Unión'),(18,'Estadio Nacional'),(19,'México'),(20,'Canadá'),
(21,'Javier Prado'),(22,'Canaval y Moreyra'),(23,'Aramburú'),(24,'28 de Julio'),(25,'Angamos'),
(26,'Ricardo Palma'),(27,'Benavides'),(28,'Fernando Terán'),(29,'Plaza de Flores'),(30,'Bulevar'),
(31,'Balta'),(32,'Rosario de Villa'),(33,'Matellini');

-- Empresas operadoras
INSERT INTO empresa_operadora (empresa_id, nombre) VALUES
(1,'Lima Bus Internacional 1'),(2,'Transvial Lima S.A.C.'),(3,'Perú Masivo S.A.'),
(4,'Lima Vías Express S.A.'),(5,'Alimentadora del Sur S.A.C.'),(6,'Alimentadora del Norte S.A.C.'),
(7,'Consorcio Alimentador Centro'),(8,'Otra empresa');

-- Vehiculos
INSERT INTO vehiculo (vehiculo_id, placa, empresa_id) VALUES
(1,'A1B-001',1),(2,'A1B-002',1),(3,'A1B-003',1),
(4,'B2C-001',2),(5,'B2C-002',2),(6,'B2C-003',2),
(7,'C3D-001',3),(8,'C3D-002',3),
(9,'D4E-001',4),(10,'D4E-002',4),
(11,'E5F-001',5),(12,'E5F-002',5),
(13,'F6G-001',6),(14,'F6G-002',6);

-- Conductores
INSERT INTO conductor (conductor_id, nombre, licencia) VALUES
(1,'Carlos Mendoza López','A-III'),(2,'Juan Pérez García','A-III'),
(3,'Miguel Ángel Torres','A-III'),(4,'Roberto Sánchez Cruz','A-III'),
(5,'Fernando Díaz Ramos','A-III'),(6,'Luis Alberto Vargas','A-III');

-- Partes de lesion
INSERT INTO parte_lesion (parte_lesion_id, nombre) VALUES
(1,'Cabeza'),(2,'Rostro'),(3,'Cuello'),(4,'Hombro'),(5,'Brazo'),(6,'Mano'),
(7,'Tórax'),(8,'Abdomen'),(9,'Espalda / Columna'),(10,'Cadera'),(11,'Pierna'),
(12,'Rodilla'),(13,'Tobillo'),(14,'Pie'),(15,'Múltiples partes'),(16,'No aplica');

-- Atencion medica
INSERT INTO atencion_medica (atencion_medica_id, tipo) VALUES
(1,'Primeros auxilios en campo'),(2,'Traslado a tópico de estación'),(3,'Traslado a centro médico'),
(4,'Traslado en ambulancia'),(5,'Atención por bomberos'),(6,'No requirió atención'),(7,'Rechazó atención');

-- Companias de seguro
INSERT INTO compania_seguro (compania_seguro_id, nombre) VALUES
(1,'Rímac Seguros'),(2,'Pacífico Seguros'),(3,'MAPFRE'),(4,'La Positiva'),
(5,'Interseguro'),(6,'Protecta'),(7,'Por determinar'),(8,'Sin seguro');

-- Centros medicos
INSERT INTO centro_medico (centro_medico_id, nombre) VALUES
(1,'Hospital Cayetano Heredia'),(2,'Hospital Arzobispo Loayza'),(3,'Hospital Dos de Mayo'),
(4,'Hospital María Auxiliadora'),(5,'Hospital Rebagliati'),(6,'Hospital Almenara'),
(7,'Hospital de Emergencias Grau'),(8,'Hospital Sergio Bernales'),(9,'Clínica San Pablo'),
(10,'Clínica Internacional'),(11,'Clínica Ricardo Palma'),(12,'Centro de Salud más cercano'),
(13,'Tópico de estación');

-- Topicos
INSERT INTO topico_sala (topico_id, nombre) VALUES
(1,'Tópico Naranjal'),(2,'Tópico Central'),(3,'Tópico Matellini'),
(4,'Tópico Canaval y Moreyra'),(5,'Tópico Independencia'),
(6,'Sala de primeros auxilios móvil'),(7,'No aplica');

-- Comisarias
INSERT INTO comisaria (comisaria_id, nombre) VALUES
(1,'Comisaría de Independencia'),(2,'Comisaría de Comas'),(3,'Comisaría de San Martín de Porres'),
(4,'Comisaría de Rímac'),(5,'Comisaría del Cercado de Lima'),(6,'Comisaría de Lince'),
(7,'Comisaría de San Isidro'),(8,'Comisaría de Miraflores'),(9,'Comisaría de Surquillo'),
(10,'Comisaría de Barranco'),(11,'Comisaría de Chorrillos'),(12,'Otra comisaría');

-- Evaluacion de responsabilidad
INSERT INTO evaluacion_responsabilidad (evaluacion_responsabilidad_id, resultado) VALUES
(1,'Responsabilidad del conductor'),(2,'Responsabilidad del pasajero'),(3,'Responsabilidad de tercero'),
(4,'Responsabilidad compartida'),(5,'Caso fortuito / Fuerza mayor'),(6,'En investigación'),(7,'Por determinar');

-- Asesores
INSERT INTO asesor (asesor_id, nombre, correo) VALUES
(1,'Ana María Quispe','aquispe@atu.gob.pe'),(2,'Jorge Luis Fernández','jfernandez@atu.gob.pe'),
(3,'Patricia Rojas Medina','projas@atu.gob.pe'),(4,'Ricardo Huamán Silva','rhuaman@atu.gob.pe'),
(5,'Carmen Elena Vásquez','cvasquez@atu.gob.pe');

-- Tipos de documento
INSERT INTO tipo_documento (tipo_documento_id, nombre) VALUES
(1,'DNI'),(2,'Carnet de Extranjería'),(3,'Pasaporte'),(4,'PTP'),(5,'Menor sin documento');

-- Generos
INSERT INTO genero (genero_id, nombre) VALUES
(1,'Masculino'),(2,'Femenino'),(3,'No binario'),(4,'Prefiere no decir');
