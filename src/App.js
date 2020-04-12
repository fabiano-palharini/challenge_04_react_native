import React, {useState, useEffect} from "react";
import api from './services/api';
const { uuid } = require("uuidv4");

import {
  SafeAreaView,
  View,
  FlatList,
  Text,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

export default function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(()=>{
    api.get('/repositories').then( response => {
      setRepositories(response.data);
    }).catch(error => {
      console.log(error.message);
    });
  }, [])

  async function handleLikeRepository(id) {    
    const response = await api.post(`/repositories/${id}/like`);
    const newRepositories = repositories.filter(repository => repository.id !== id)
    setRepositories([...newRepositories,response.data])
  }

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#7159c1" />
      <SafeAreaView style={styles.container}>
        <View style={styles.repositoryContainer} key={uuid()}>
          {repositories.map(repository => (
            <View style={styles.repositoryContainer} key={uuid()}>
              <Text style={styles.repository} key={repository.key}>{repository.title}</Text>
              {repository.techs.map(
                  tech =>(
                    <View style={styles.techsContainer} key={uuid()}>
                      <Text style={styles.tech} key={uuid()}>
                        {tech}
                      </Text>
                    </View>
                  )
                )
              }
              <View style={styles.likesContainer} key={uuid()}>
              <Text style={styles.likeText} testID={`repository-likes-${repository.id}`} key={`repository-likes-${repository.id}`}>
                {repository.likes === 1 ? repository.likes + ' curtida' : repository.likes + ' curtidas'} 
              </Text>
              </View>
              <TouchableOpacity style={styles.button} 
              onPress={() => handleLikeRepository(repository.id)}		
              testID={`like-button-${repository.id}`} key={uuid()}>
              <Text style={styles.buttonText} key={uuid()}>Curtir</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
        
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#7159c1",
  },
  repositoryContainer: {
    marginBottom: 15,
    marginHorizontal: 15,
    backgroundColor: "#fff",
    padding: 20,
  },
  repository: {
    fontSize: 32,
    fontWeight: "bold",
  },
  techsContainer: {
    flexDirection: "row",
    marginTop: 10,
  },
  tech: {
    fontSize: 12,
    fontWeight: "bold",
    marginRight: 10,
    backgroundColor: "#04d361",
    paddingHorizontal: 10,
    paddingVertical: 5,
    color: "#fff",
  },
  likesContainer: {
    marginTop: 15,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  likeText: {
    fontSize: 14,
    fontWeight: "bold",
    marginRight: 10,
  },
  button: {
    marginTop: 10,
  },
  buttonText: {
    fontSize: 14,
    fontWeight: "bold",
    marginRight: 10,
    color: "#fff",
    backgroundColor: "#7159c1",
    padding: 15,
  },
});
