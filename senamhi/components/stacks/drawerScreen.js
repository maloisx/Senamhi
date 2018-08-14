
import {DrawerNavigator} from 'react-navigation';

import TiempoActualScreen from '../screen/TiempoActualScreen';
import MapasScreen from '../screen/MapasScreen';
import AvisosScreen from '../screen/AvisosScreen';
import AjustesScreen from '../screen/AjustesScreen';
import BuscarCiudadScreen from '../screen/BuscarCiudadScreen';
import FotoSenamhiScreen from '../screen/FotoSenamhiScreen';

const DrawerScreen = DrawerNavigator({          
    "Comparte tu ciudad": {screen: FotoSenamhiScreen}, 
    "Pronostico del Día": {screen: TiempoActualScreen},
    "Mapas": {screen: MapasScreen},
    "Avisos": {screen: AvisosScreen}, 
    "Buscar Ciudad": {screen: BuscarCiudadScreen},
    //"Ajustes": {screen: AjustesScreen},
    
}, {
    headerMode: 'none',    
})

export default DrawerScreen;