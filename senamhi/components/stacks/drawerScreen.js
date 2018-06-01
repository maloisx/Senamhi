
import {DrawerNavigator} from 'react-navigation';

import TiempoActualScreen from '../screen/TiempoActualScreen';
import MapasScreen from '../screen/MapasScreen';
import AvisosScreen from '../screen/AvisosScreen2';
import AjustesScreen from '../screen/AjustesScreen';

const DrawerScreen = DrawerNavigator({      
    "Pronostico del Día": {screen: TiempoActualScreen},
    "Mapas": {screen: MapasScreen},    
    
    "Avisos": {screen: AvisosScreen}, 
    //"Ajustes": {screen: AjustesScreen},
}, {
    headerMode: 'none',    
})

export default DrawerScreen;