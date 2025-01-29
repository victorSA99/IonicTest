# My Ionic React App

## Descripción

Esta es una aplicación móvil creada con **Ionic** y **React**. Utiliza **Capacitor** para la compilación y despliegue en plataformas nativas. A continuación se detallan las instrucciones de configuración, instalación y uso.

## Requisitos Previos

Asegúrate de tener instaladas las siguientes versiones:

- **Node.js**: `v21.7.3`
- **NPM**: `v10.5.0`
- **Ionic**: `v7.x.x` (Puedes verificar la versión instalada con el comando `ionic --version`)

## Instalación

Sigue estos pasos para instalar y configurar el proyecto:

1. **Clonar el repositorio**:
    ```bash
    git clone https://github.com/usuario/nombre-del-proyecto.git
    ```

2. **Navegar al directorio del proyecto**:
    ```bash
    cd nombre-del-proyecto
    ```

3. **Instalar las dependencias**:
    ```bash
    npm install
    ```

4. **Instalar Ionic CLI** si no lo tienes instalado globalmente:
    ```bash
    npm install -g @ionic/cli
    ```

## Ejecución del proyecto

Para ejecutar la aplicación en un navegador, puedes usar el siguiente comando:

```bash
ionic serve
```

## Compilar el proyecto para plataformas nativas

### Configurar Capacitor

#### Agregar una plataforma (iOS/Android):

```bash
ionic capacitor add ios
# o
ionic capacitor add android
```
### Compilar la aplicación:
```bash
ionic build
```
Sincronizar Capacitor para reflejar los cambios en el proyecto nativo:
```bash
npx cap sync
```
Abrir el proyecto en Xcode (iOS) o Android Studio (Android):
```bash
npx cap open ios
# o
npx cap open android
```
### Cambiar el Splashscreen
Si deseas cambiar el Splashscreen de la aplicación, sigue estos pasos:

Reemplaza las imágenes del splashscreen en la carpeta assets del proyecto. Los formatos recomendados son png o svg.

Ejecuta el siguiente comando para generar los assets correctos para todas las plataformas:

```bash
npx capacitor-assets generate
```
Este comando creará los recursos para diferentes tamaños de pantallas y los aplicará a los proyectos nativos (iOS y Android).
