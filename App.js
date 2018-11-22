import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Alert, Button } from 'react-native';
import { MaterialCommunityIcons as Icon} from '@expo/vector-icons';

export default class App extends React.Component {

  constructor(props){

    super(props);

    this.state={
      gameState: [[0,0,0],[0,0,0],[0,0,0]],
      currentPlayer:1
    }
  };
  
  componentDidMount(){
    this.initializeGame();
  }

  initializeGame=() =>{
    this.setState({
      gameState:
      [[0,0,0],[0,0,0],[0,0,0]]
    });
  }

  winner = () => {

    const num_tiles = 3;
    let arr = this.state.gameState;
    let sum;

    //Checa filas
    for(let i = 0; i<num_tiles; i++){
      sum = arr[i][0] + arr[i][1] + arr[i][2];
      if(sum == 3){return 1;}
      else if(sum == -3){return 1;}
    }

    //Checa columnas
    for(let i = 0; i<num_tiles; i++){
      sum = arr[0][i] + arr[1][i] + arr[2][i];
      if(sum == 3){return 1;}
      else if (sum == -3){ return -1;}
    }

    //Diagonales
    sum = arr[0][0] + arr[1][1] + arr[2][2];
    if(sum == 3){return 1;}
    else if (sum == -3) {return -1}

    sum = arr[2][0] + arr[1][1] + arr[0][2];
    if(sum == 3){return 1;}
    else if (sum == -3) {return -1}

    // Empate
    return 0;

  }

  onPressHere = (row,col) =>{
    //Validacion
    let value =  this.state.gameState[row][col];
    if (value !==0) {return;}
   
    let currentPlayer = this.state.currentPlayer;

    let arr = this.state.gameState.slice();
    arr[row][col] = currentPlayer;
    this.setState({gameState:arr});

    //Siguiente jugador
    let nextPlayer = (currentPlayer ==1) ? -1:1;
    this.setState({currentPlayer:nextPlayer});

    //Resultados
    let win = this.winner();
    if(win == 1){
      Alert.alert("No te quiere ");
      this.initializeGame();
    }else if(win == -1){
      Alert.alert("Te quiere");
      this.initializeGame();
    }

  }

  newGame = () => {
    this.initializeGame();
  }
  
  renderIcon = (row,col) => {
    let value = this.state.gameState[row][col];
    switch(value)
    {
      case 1: return <Icon name="heart-broken" style={styles.heart}/>;
      case -1: return <Icon name="heart" style={styles.heart}/>;
      default: return <View />;
    }
  };

  render() {
    return (
      <View style={styles.container}>
      <Text style={styles.love}>Me quiere, no me quiere.</Text>

        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity onPress={()=> this.onPressHere(0,0)} style={[styles.title, {borderLeftWidth:0,borderTopWidth: 0}]}>
          {this.renderIcon(0,0)}
        </TouchableOpacity>
          <TouchableOpacity onPress={()=> this.onPressHere(0,1)} style={[styles.title,{borderTopWidth:0}]}>
          {this.renderIcon(0,1)}
          </TouchableOpacity>
          <TouchableOpacity onPress={()=> this.onPressHere(0,2)} style={[styles.title,{borderTopWidth:0,borderRightWidth:0}]}>
          {this.renderIcon(0,2)}
          </TouchableOpacity>
        </View>

        <View style={{flexDirection:'row'}}>
          <TouchableOpacity onPress={()=> this.onPressHere(1,0)} style={[styles.title,{borderLeftWidth:0}]}>
          {this.renderIcon(1,0)}
          </TouchableOpacity>
          <TouchableOpacity onPress={()=> this.onPressHere(1,1)} style={[styles.title,{}]}>
          {this.renderIcon(1,1)}
          </TouchableOpacity>
          <TouchableOpacity onPress={()=> this.onPressHere(1,2)} style={[styles.title,{borderRightWidth:0}]}>
          {this.renderIcon(1,2)}
          </TouchableOpacity>
        </View>

        <View style={{flexDirection: "row"}}>
          <TouchableOpacity onPress={()=> this.onPressHere(2,0)} style={[styles.title,{borderLeftWidth:0, borderBottomWidth:0}]}>
          {this.renderIcon(2,0)}
          </TouchableOpacity>
          <TouchableOpacity onPress={()=> this.onPressHere(2,1)} style={[styles.title,{borderBottomWidth:0}]}>
          {this.renderIcon(2,1)}
          </TouchableOpacity>
          <TouchableOpacity onPress={()=> this.onPressHere(2,2)} style={[styles.title,{borderBottomWidth:0, borderRightWidth:0}]}>
          {this.renderIcon(2,2)}
          </TouchableOpacity>
        </View>

        <View style={{paddingTop:50}}/>
        <Button title= "Nuevo juego" onPress={()=>this.newGame()}/>

      </View>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title:{
    borderColor: "white",
    borderWidth:2,
    width: 100,
    height:100,
    alignItems:"center",
    justifyContent: "center",
  },
  heart:{
    color: "red",
    fontSize: 60,
  
  },
  love:{
    fontSize:25,
    paddingBottom: 50,
    color: "white",
  },
});
