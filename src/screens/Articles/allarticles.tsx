import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { fetchAllArticles } from '@/utils/fetchArticle';

interface Article {
  title: string;
  author: string;
  urlToImage: string;
  description:string;
  content: string; // Assuming each article has a 'content' field
}

const AllArticles: React.FC = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const navigation = useNavigation();

  useEffect(() => {
    const getArticles = async () => {
      try {
        const data = await fetchAllArticles();
        setArticles(data.articles); // Assuming 'data' has an 'articles' field
      } catch (error) {
        console.error("Error fetching articles:", error);
      }
    };

    getArticles();
  }, []);

  const navigateToArticleDetail = (article: Article) => {
    navigation.navigate('ArticleDetails', { article });
  };

  const ArticleItem: React.FC<{ item: Article }> = ({ item }) => (
    <TouchableOpacity style={styles.articleContainer} onPress={() => navigateToArticleDetail(item)}>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.author}>{item.author}</Text>
      <Image style={styles.image} source={{ uri: item.urlToImage }} />
      <Text>{item.description}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={articles}
        keyExtractor={(item,index) => index} // Assuming each article has a unique 'url'
        renderItem={({ item }) => <ArticleItem item={item} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  articleContainer: {
    marginBottom: 16,
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  author: {
    fontStyle: 'italic',
    marginBottom: 8,
  },
  image: {
    width: '100%',
    height: 200, // Adjust as per your design
    resizeMode: 'cover', // Adjust resizeMode as per your requirement
    marginBottom: 8,
    borderRadius: 8,
  },
});

export default AllArticles;
