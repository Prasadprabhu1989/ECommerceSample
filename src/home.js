import React from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  TextInput,
} from 'react-native';
import { PRODUCTS } from './data';
import { TRENDING_PRODUCTS } from './trending';

const categories = ['Popular', 'Clothes', 'Shoes', 'Bags', 'Watch'];

export default function HomeScreen({ onProductPress }) {
  return (
    <ScrollView
      style={{ backgroundColor: '#fff' }}
      contentContainerStyle={{ paddingBottom: 20 }}
    >
      <View style={styles.searchContainer}>
        <Text style={{ fontSize: 20 }}>☰</Text>
        <View style={styles.searchInputBox}>
          <Text style={{ fontSize: 16, color: '#888' }}>🔍</Text>
          <TextInput placeholder="Search" style={styles.searchInput} />
          <Text style={{ fontSize: 16, color: '#888' }}>🔎</Text>
        </View>
        <TouchableOpacity>
          <Text style={{ fontSize: 20 }}>⚙️</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.categories}
      >
        {categories.map((item, index) => (
          <View
            key={index}
            style={[styles.categoryItem, index === 0 && styles.activeCategory]}
          >
            <Text
              style={
                index === 0 ? styles.activeCategoryText : styles.categoryText
              }
            >
              {item}
            </Text>
          </View>
        ))}
      </ScrollView>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.productRow}
      >
        {PRODUCTS.map(item => (
          <TouchableOpacity
            key={item.id}
            style={styles.productCard}
            onPress={() => onProductPress(item)}
          >
            <Image source={item.image} style={styles.productImage} />
            <Text style={styles.productTitle}>{item.title}</Text>
            <Text style={styles.productRating}>⭐ {item.rating} (1089)</Text>
            <Text>
              <Text style={styles.productPrice}>${item.price}</Text>
              <Text style={styles.productOldPrice}> ${item.originalPrice}</Text>
              <Text style={styles.productDiscount}> -20%</Text>
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <View style={styles.trendingSection}>
        <Text style={styles.trendingTitle}>Trending Now</Text>
        <TouchableOpacity>
          <Text style={{ color: '#00f' }}>{'>'}</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 10 }}
      >
        {TRENDING_PRODUCTS.map(item => (
          <TouchableOpacity
            key={item.id}
            style={styles.trendingCard}
            onPress={() => onProductPress(item)}
          >
            <Image source={item.image} style={{ width: 80, height: 80 }} />
            <Text style={{ fontSize: 12 }}>{item.title}</Text>
            <Text style={{ fontSize: 10, color: '#666' }}>People love it</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    gap: 10,
  },
  searchInputBox: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f2f2f2',
    borderRadius: 8,
    paddingHorizontal: 10,
    gap: 6,
  },
  searchInput: {
    flex: 1,
    height: 40,
  },
  categories: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  categoryItem: {
    backgroundColor: '#f2f2f2',
    borderRadius: 20,
    padding: 10,
    marginRight: 10,
  },
  activeCategory: {
    backgroundColor: '#007bff',
  },
  categoryText: {
    color: '#444',
  },
  activeCategoryText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  productRow: {
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  productCard: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
    width: 150,
    marginRight: 10,
  },
  productImage: {
    width: 100,
    height: 100,
    marginBottom: 10,
  },
  productTitle: {
    fontWeight: 'bold',
    fontSize: 14,
    textAlign: 'center',
  },
  productRating: {
    fontSize: 12,
    color: '#888',
    marginBottom: 4,
  },
  productPrice: {
    fontWeight: 'bold',
    fontSize: 14,
  },
  productOldPrice: {
    fontSize: 12,
    textDecorationLine: 'line-through',
    color: '#888',
  },
  productDiscount: {
    fontSize: 12,
    color: '#007bff',
    fontWeight: 'bold',
  },
  trendingSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    marginTop: 20,
    marginBottom: 10,
  },
  trendingTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  trendingCard: {
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 10,
    marginHorizontal: 6,
    borderRadius: 10,
    width: 100,
  },
});
