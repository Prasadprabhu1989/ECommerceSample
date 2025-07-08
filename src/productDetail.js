import React, { useContext, useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Modal,
  FlatList,
} from 'react-native';

import { CartContext } from './CartProvider';
import ToastMessage, { Toast } from './ToastMessage';

export default function ProductDetail({ product, onClose }) {
  const { addToCart } = useContext(CartContext);
  const [selectedColor, setSelectedColor] = useState(
    product?.colors?.[0] || '',
  );
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState('');
  const [showSizeModal, setShowSizeModal] = useState(false);
  const [showQuantityModal, setShowQuantityModal] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const openModal = setter => setter(true);
  const closeModal = setter => setter(false);

  const renderDropdownModal = (
    title,
    options,
    selected,
    setSelected,
    close,
  ) => (
    <Modal transparent animationType="fade" visible>
      <TouchableOpacity
        style={styles.modalOverlay}
        activeOpacity={1}
        onPress={() => close(false)}
      >
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>{title}</Text>
          <FlatList
            data={options}
            keyExtractor={item => item.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.modalOption}
                onPress={() => {
                  setSelected(item);
                  close(false);
                }}
              >
                <Text style={styles.modalOptionText}>{item}</Text>
              </TouchableOpacity>
            )}
          />
        </View>
      </TouchableOpacity>
    </Modal>
  );

  return (
    <ScrollView style={{ backgroundColor: '#fff' }}>
      <TouchableOpacity
        onPress={onClose}
        style={{ marginTop: 20, alignItems: 'center' }}
      >
        <Text style={{ color: '#007bff' }}>← Back</Text>
      </TouchableOpacity>
      <Image source={product.image} style={styles.productImage} />

      <View style={styles.container}>
        <Text style={styles.productTitle}>{product.title}</Text>

        <View style={styles.priceRow}>
          <Text style={styles.discount}>-30%</Text>
          <Text style={styles.price}>${product.price}</Text>
          <Text style={styles.oldPrice}>${product.originalPrice}</Text>
        </View>

        <View style={styles.ratingRow}>
          <Text style={styles.rating}>
            ⭐ {product.rating} ({product.reviews})
          </Text>
          <Text style={styles.sales}>📦 {product.sales || '1.5k'} Sold</Text>
        </View>

        {/* Colors */}
        <Text style={styles.label}>Color Family</Text>
        <View style={styles.colorRow}>
          {product.colors.map(color => (
            <TouchableOpacity
              key={color}
              style={[
                styles.colorBox,
                selectedColor === color && styles.colorBoxSelected,
              ]}
              onPress={() => setSelectedColor(color)}
            >
              <Text
                style={{ color: selectedColor === color ? '#fff' : '#000' }}
              >
                {color}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Dropdowns */}
        <View style={styles.dropdownRow}>
          <View style={styles.dropdown}>
            <Text style={styles.label}>Show Size</Text>
            <TouchableOpacity
              onPress={() => openModal(setShowSizeModal)}
              style={styles.dropdownBox}
            >
              <Text>{selectedSize || 'Select One'}</Text>
            </TouchableOpacity>
            {showSizeModal &&
              renderDropdownModal(
                'Select Size',
                product.sizes,
                selectedSize,
                setSelectedSize,
                setShowSizeModal,
              )}
          </View>

          <View style={styles.dropdown}>
            <Text style={styles.label}>Quantity</Text>
            <TouchableOpacity
              onPress={() => openModal(setShowQuantityModal)}
              style={styles.dropdownBox}
            >
              <Text>{quantity || 'Select One'}</Text>
            </TouchableOpacity>
            {showQuantityModal &&
              renderDropdownModal(
                'Select Quantity',
                [1, 2, 3, 4, 5],
                quantity,
                setQuantity,
                setShowQuantityModal,
              )}
          </View>
        </View>

        {/* Buttons */}
        <View style={styles.buttonRow}>
          <TouchableOpacity
            style={styles.outlineBtn}
            onPress={() => {
              addToCart({ ...product, quantity: quantity || 1 });
              setShowToast(true);
            }}
          >
            <Text style={styles.outlineText}>Add to Cart</Text>
            {showToast && (
              <ToastMessage
                message="Added to cart ✅"
                onHide={() => setShowToast(false)}
              />
            )}
          </TouchableOpacity>
          <TouchableOpacity style={styles.fillBtn}>
            <Text style={styles.fillText}>Buy Now</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16 },
  productImage: { width: '100%', height: 250, resizeMode: 'contain' },
  storeName: {
    color: '#007bff',
    fontWeight: '600',
    fontSize: 14,
    marginBottom: 4,
  },
  productTitle: { fontSize: 20, fontWeight: 'bold', marginBottom: 8 },
  priceRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 6 },
  discount: { color: '#007bff', marginRight: 8 },
  price: { fontSize: 18, fontWeight: 'bold', marginRight: 6 },
  oldPrice: { textDecorationLine: 'line-through', color: '#999' },
  ratingRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
  rating: { fontSize: 14 },
  sales: { fontSize: 14, marginLeft: 10 },
  label: { marginVertical: 8, fontWeight: '500' },
  colorRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  colorBox: {
    borderWidth: 1,
    borderColor: '#ccc',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
    marginRight: 8,
    marginBottom: 8,
  },
  colorBoxSelected: {
    backgroundColor: '#007bff',
    borderColor: '#007bff',
  },
  dropdownRow: { flexDirection: 'row', justifyContent: 'space-between' },
  dropdown: { flex: 1, marginRight: 10 },
  dropdownBox: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    marginTop: 4,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  outlineBtn: {
    flex: 1,
    marginRight: 10,
    padding: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#007bff',
    alignItems: 'center',
  },
  fillBtn: {
    flex: 1,
    backgroundColor: '#007bff',
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  outlineText: { color: '#007bff', fontWeight: 'bold' },
  fillText: { color: '#fff', fontWeight: 'bold' },
  modalOverlay: {
    flex: 1,
    backgroundColor: '#00000066',
    justifyContent: 'center',
  },
  modalContent: {
    margin: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
  },
  modalTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
  modalOption: {
    paddingVertical: 12,
    borderBottomWidth: 0.5,
    borderBottomColor: '#eee',
  },
  modalOptionText: { fontSize: 16 },
});
