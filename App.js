/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import { useState } from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  useColorScheme,
  View,
  TouchableOpacity,
  Text,
  Modal,
} from 'react-native';
import HomeScreen from './src/home';
import ProductDetail from './src/productDetail';
import { CartProvider } from './src/CartProvider';
import CartScreen from './src/cartScreen';


function App() {
  const [tab, setTab] = useState('home'); // 'home' or 'cart'
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const openProductDetail = product => {
    console.log(`products ${product}`);
    setSelectedProduct(product);
    setModalVisible(true);
  };

  const closeProductDetail = () => {
    setModalVisible(false);
  };
  return (
    <CartProvider>
      <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
        {tab === 'home' && <HomeScreen onProductPress={openProductDetail} />}
        {tab === 'cart' && <CartScreen />}

        {/* Bottom TabBar */}
        <View
          style={{
            flexDirection: 'row',
            height: 60,
            borderTopWidth: 1,
            borderColor: '#ccc',
          }}
        >
          <TouchableOpacity
            style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
            onPress={() => setTab('home')}
          >
            <Text style={{ fontSize: 20 }}>{tab === 'home' ? '🏠' : '🏚️'}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
            onPress={() => setTab('cart')}
          >
            <Text style={{ fontSize: 20 }}>{tab === 'cart' ? '🛒' : '🛍️'}</Text>
          </TouchableOpacity>
        </View>

        {/* Product Detail */}
        <Modal
          visible={modalVisible}
          animationType="none"
          onRequestClose={closeProductDetail}
        >
          <ProductDetail
            product={selectedProduct}
            onClose={closeProductDetail}
          />
        </Modal>
      </SafeAreaView>
    </CartProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
