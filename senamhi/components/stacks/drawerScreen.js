
import {DrawerNavigator} from 'react-navigation';

import TiempoActualScreen from '../screen/TiempoActualScreen';
import MapasScreen from '../screen/MapasScreen';
import AvisosScreen from '../screen/AvisosScreen';
import AjustesScreen from '../screen/AjustesScreen';
import BuscarCiudadScreen from '../screen/BuscarCiudadScreen';

const DrawerScreen = DrawerNavigator({          
    
    "Pronostico del Día": {screen: TiempoActualScreen},
    "Mapas": {screen: MapasScreen},   
    "Avisos": {screen: AvisosScreen}, 
    "Buscar Ciudad": {screen: BuscarCiudadScreen},
    //"Ajustes": {screen: AjustesScreen},
}, {
    headerMode: 'none',    
})

export default DrawerScreen;