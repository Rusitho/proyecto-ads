
-- =============================================
-- BASE DE DATOS: sistema_incidentes
-- =============================================

CREATE DATABASE IF NOT EXISTS sistema_incidentes
CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

USE sistema_incidentes;

CREATE TABLE categoria (
    categoria_id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(150) NOT NULL
);

CREATE TABLE subcategoria (
    subcategoria_id INT AUTO_INCREMENT PRIMARY KEY,
    categoria_id INT NOT NULL,
    nombre VARCHAR(150) NOT NULL,
    FOREIGN KEY (categoria_id) REFERENCES categoria(categoria_id)
);

CREATE TABLE tipo_lesion (
    tipo_lesion_id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(150)
);

CREATE TABLE origen (
    origen_id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(150)
);

CREATE TABLE evaluacion_riesgo (
    riesgo_id INT AUTO_INCREMENT PRIMARY KEY,
    nivel VARCHAR(50)
);

CREATE TABLE estacion (
    estacion_id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(150)
);

CREATE TABLE empresa_operadora (
    empresa_id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(150)
);

CREATE TABLE vehiculo (
    vehiculo_id INT AUTO_INCREMENT PRIMARY KEY,
    placa VARCHAR(20),
    empresa_id INT,
    FOREIGN KEY (empresa_id) REFERENCES empresa_operadora(empresa_id)
);

CREATE TABLE conductor (
    conductor_id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(150),
    licencia VARCHAR(50)
);

CREATE TABLE parte_lesion (
    parte_lesion_id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(150)
);

CREATE TABLE soat (
    soat_id INT AUTO_INCREMENT PRIMARY KEY,
    numero VARCHAR(50),
    vigencia DATE
);

CREATE TABLE atencion_medica (
    atencion_medica_id INT AUTO_INCREMENT PRIMARY KEY,
    tipo VARCHAR(150)
);

CREATE TABLE compania_seguro (
    compania_seguro_id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(150)
);

CREATE TABLE centro_medico (
    centro_medico_id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(150)
);

CREATE TABLE topico_sala (
    topico_id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(150)
);

CREATE TABLE comisaria (
    comisaria_id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(150)
);

CREATE TABLE evaluacion_responsabilidad (
    evaluacion_responsabilidad_id INT AUTO_INCREMENT PRIMARY KEY,
    resultado VARCHAR(150)
);

CREATE TABLE asesor (
    asesor_id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(150),
    correo VARCHAR(150)
);

CREATE TABLE tipo_documento (
    tipo_documento_id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(50)
);

CREATE TABLE genero (
    genero_id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(50)
);

CREATE TABLE usuario (
    usuario_id INT AUTO_INCREMENT PRIMARY KEY,
    tipo_documento_id INT,
    numero_documento VARCHAR(50),
    nombres VARCHAR(150),
    apellidos VARCHAR(150),
    genero_id INT,
    telefono VARCHAR(50),
    correo VARCHAR(150),
    FOREIGN KEY (tipo_documento_id) REFERENCES tipo_documento(tipo_documento_id),
    FOREIGN KEY (genero_id) REFERENCES genero(genero_id)
);

CREATE TABLE incidente (
    incidente_id INT AUTO_INCREMENT PRIMARY KEY,

    categoria_id INT,
    subcategoria_id INT,
    tipo_lesion_id INT,
    origen_id INT,
    riesgo_id INT,

    estacion_id INT,
    vehiculo_id INT,
    conductor_id INT,
    empresa_id INT,

    parte_lesion_id INT,

    soat_id INT,
    atencion_medica_id INT,
    compania_seguro_id INT,
    centro_medico_id INT,
    topico_id INT,
    comisaria_id INT,

    evaluacion_responsabilidad_id INT,
    asesor_id INT,

    fecha_evento DATETIME,
    descripcion TEXT,
    estado VARCHAR(50),
    fecha_registro DATETIME DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (categoria_id) REFERENCES categoria(categoria_id),
    FOREIGN KEY (subcategoria_id) REFERENCES subcategoria(subcategoria_id),
    FOREIGN KEY (tipo_lesion_id) REFERENCES tipo_lesion(tipo_lesion_id),
    FOREIGN KEY (origen_id) REFERENCES origen(origen_id),
    FOREIGN KEY (riesgo_id) REFERENCES evaluacion_riesgo(riesgo_id),

    FOREIGN KEY (estacion_id) REFERENCES estacion(estacion_id),
    FOREIGN KEY (vehiculo_id) REFERENCES vehiculo(vehiculo_id),
    FOREIGN KEY (conductor_id) REFERENCES conductor(conductor_id),
    FOREIGN KEY (empresa_id) REFERENCES empresa_operadora(empresa_id),

    FOREIGN KEY (parte_lesion_id) REFERENCES parte_lesion(parte_lesion_id),

    FOREIGN KEY (soat_id) REFERENCES soat(soat_id),
    FOREIGN KEY (atencion_medica_id) REFERENCES atencion_medica(atencion_medica_id),
    FOREIGN KEY (compania_seguro_id) REFERENCES compania_seguro(compania_seguro_id),
    FOREIGN KEY (centro_medico_id) REFERENCES centro_medico(centro_medico_id),
    FOREIGN KEY (topico_id) REFERENCES topico_sala(topico_id),
    FOREIGN KEY (comisaria_id) REFERENCES comisaria(comisaria_id),

    FOREIGN KEY (evaluacion_responsabilidad_id) REFERENCES evaluacion_responsabilidad(evaluacion_responsabilidad_id),
    FOREIGN KEY (asesor_id) REFERENCES asesor(asesor_id)
);

CREATE TABLE incidente_usuario (
    id INT AUTO_INCREMENT PRIMARY KEY,
    incidente_id INT,
    usuario_id INT,
    FOREIGN KEY (incidente_id) REFERENCES incidente(incidente_id),
    FOREIGN KEY (usuario_id) REFERENCES usuario(usuario_id)
);

CREATE INDEX idx_inc_categoria ON incidente(categoria_id);
CREATE INDEX idx_inc_fecha ON incidente(fecha_evento);
CREATE INDEX idx_usuario_doc ON usuario(numero_documento);
CREATE INDEX idx_vehiculo_placa ON vehiculo(placa);
