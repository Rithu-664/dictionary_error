import React,{Component} from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import {AntDesign} from '@expo/vector-icons'
import {Button, Header} from 'react-native-elements'
import dictionary from './localdb'
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default class App extends Component{
  constructor(props){
    super(props);

    this.state = {
      text:"",
      word:'',
      wordReturned:'',
      lexicalCategory:'',
      definition:'',
      isButtonPressed:false
     }
  }

  getWord = (text) => {
    var Text = text.toLowerCase();
    try{
      var word = dictionary[Text]["word"]
      var lexicalCategory = dictionary[Text]["lexicalCategory"]
      var definition = dictionary[Text]["definition"]
      this.setState({
        "word":word,
        "lexicalCategory":lexicalCategory,
        "definition":definition
      })
    }catch(err){
      alert("Sorry this word is not available please try something else")
      this.setState({
        text:'',
        isButtonPressed:false
      })
    }
  }

  render(){
    var text = this.state.text
    var word = this.state.word

    return (
      <SafeAreaProvider>
         <Header
          leftComponent={{icon:'menu'}}
          centerComponent={{text:'Dictionary',style:{fontWeight:'bold',fontSize:20}}}
        />

        <TextInput
          placeholder="Enter a word..."
          placeholderTextColor='cadetblue'
          value={this.state.text}
          onChangeText={text => {this.setState({text:text})}}
          style={{borderWidth:2,borderRadius:10,borderColor:'cornflowerblue',alignSelf:'center',marginTop:250,paddingLeft:10,paddingVertical:10,paddingRight:100}}
        />

        <TouchableOpacity style={{padding:30,alignItems:'center',backgroundColor:'darkslateblue'}} onPress={() => {this.setState({word:text,wordReturned:word})
      this.getWord(this.state.word)}}><AntDesign name="search1" size={30} color="white"/></TouchableOpacity>

        <Text style={{fontSize:30,fontWeight:'bold',}}>{this.state.wordReturned}</Text>

        <Text style={{fontSize:24}}>{this.state.lexicalCategory}</Text>
        <Text style={{fontSize:24}}>{this.state.definition}</Text>
      </SafeAreaProvider>
    );
  }
 
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
