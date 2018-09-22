
import {DrawerNavigator} from 'react-navigation';

import TiempoActualScreen from '../screen/TiempoActualScreen';
import PronosticoScreen from '../screen/PronosticoScreen';
import MapasScreen from '../screen/MapasScreen';
import AvisosScreen from '../screen/AvisosScreen';
import AjustesScreen from '../screen/AjustesScreen';
import BuscarCiudadScreen from '../screen/BuscarCiudadScreen';
import FotoSenamhiScreen from '../screen/FotoSenamhiScreen';


import PruebaScreenJheiner from '../screen/PruebaScreenJheiner';
import Prueba02 from '../screen/Prueba02';
import PruebaListAlertas from '../screen/PruebaListAlertas';

const DrawerScreen = DrawerNavigator({         
    "Pronostico xxx": {screen: PronosticoScreen},
    "Prueba List Alerta": {screen: PruebaListAlertas},
    "Prueba02": {screen: Prueba02},
    "PruebaJheiner": {screen: PruebaScreenJheiner},

    "Pronostico del Día": {screen: TiempoActualScreen},
    "Mapas": {screen: MapasScreen},
    "Avisos": {screen: AvisosScreen}, 
    "Buscar Ciudad": {screen: BuscarCiudadScreen},
    "Comparte tu ciudad": {screen: FotoSenamhiScreen}, 
    //"Ajustes": {screen: AjustesScreen},
    
}, {
    headerMode: 'none',    
})

export default DrawerScreen;