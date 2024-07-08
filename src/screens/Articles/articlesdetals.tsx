import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList, TextInput, ScrollView } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

interface Article {
  title: string;
  author: string;
  content: string;
  urlToImage: string;
}

interface Comment {
  text: string;
  timestamp: string;
}

type ArticleDetailRouteProp = RouteProp<{ params: { article: Article } }, 'params'>;

const ArticleDetailScreen: React.FC = () => {
  const route = useRoute<ArticleDetailRouteProp>();
  const { article } = route.params;

  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');
  const [showFullContent, setShowFullContent] = useState(false);

  const toggleContent = () => {
    setShowFullContent(!showFullContent);
  };

  const navigation =useNavigation()

  const handleAddComment = () => {
    if (newComment.trim() === '') return;

    const timestamp = new Date().toLocaleString();
    const comment: Comment = {
      text: newComment,
      timestamp,
    };

    setComments([...comments, comment]);
    setNewComment('');
  };

  const renderComment = ({ item }: { item: Comment }) => (
    <View style={styles.commentContainer}>
      <Text style={styles.commentText}>{item.text}</Text>
      <Text style={styles.commentTimestamp}>{item.timestamp}</Text>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backButton}>Back</Text>
        </TouchableOpacity>
      </View>
        <Text style={styles.title}>{article.title}</Text>
        <Text style={styles.author}>By {article.author}</Text>
      <Image source={{ uri: article.urlToImage }} style={styles.image} />
      <Text style={styles.content}>
        {showFullContent ? article.content : `${article.content.slice(0, 200)}... `}
        <Text style={styles.readMoreLink} onPress={toggleContent}>
          {showFullContent ? 'Read less' : 'Read more'}
        </Text>
      </Text>
      <View style={{flexDirection:"row",justifyContent:"space-between"}}>

      <TouchableOpacity style={styles.likeButton}>
        <FontAwesome name="thumbs-o-up" size={24} color="#007BFF" />
        <Text style={styles.likeButtonText}>Like</Text>
      </TouchableOpacity>
      <TouchableOpacity>
        <MaterialIcons name="comment" size={30} color="#000" />
      </TouchableOpacity>
      </View>
      <View style={styles.commentsContainer}>
        <Text style={styles.commentsHeader}>Comments</Text>
        {comments.length === 0 ? (
          <Text style={styles.noCommentText}>No comments yet</Text>
        ) : (
          <FlatList
            data={comments}
            renderItem={renderComment}
            keyExtractor={(item, index) => index.toString()}
            contentContainerStyle={styles.commentsList}
          />
        )}
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Add a comment..."
          value={newComment}
          onChangeText={setNewComment}
          multiline
        />
        <TouchableOpacity style={styles.sendButton} onPress={handleAddComment}>
          <Text style={styles.sendButtonText}>Send</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 16,
  },
  backButton: {
    color: '#007BFF',
    fontSize: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  author: {
    color: '#808080',
    marginBottom: 16,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginBottom: 16,
  },
  content: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 16,
  },
  readMoreLink: {
    color: '#007BFF',
  },
  likeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  likeButtonText: {
    marginLeft: 8,
    fontSize: 16,
    color: '#007BFF',
  },
  commentsContainer: {
    marginBottom: 16,
  },
  commentsHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  noCommentText: {
    fontStyle: 'italic',
    marginBottom: 8,
  },
  commentsList: {
    flexGrow: 1,
  },
  commentContainer: {
    backgroundColor: '#f0f0f0',
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
  },
  commentText: {
    fontSize: 16,
    marginBottom: 4,
  },
  commentTimestamp: {
    fontSize: 12,
    color: '#808080',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#e1e8ed',
    paddingTop: 16,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#cccccc',
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginRight: 10,
    maxHeight: 150,
  },
  sendButton: {
    backgroundColor: '#007BFF',
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  sendButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default ArticleDetailScreen;
