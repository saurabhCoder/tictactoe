import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Button, TouchableHighlight, Image } from 'react-native';

  const calculateWinner = (squares) =>{
    let space = 'N';
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if ((squares[a]==='X' || squares[a]==='O') && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
        
      }
      if (squares[a]===' ')
          space = ' '
    }
    return space;
  }
  
  
  class Game extends React.Component {
    constructor(props){
      super(props);
      this.state = {
        history: [{squares: Array(9).fill(' '),}],
        xIsNext: true,
        stepNumber: 0,
      };  
    }
    
    handleClick(i){
      const history = this.state.history.slice(0,this.state.stepNumber+1);
      const current = history[history.length-1]
      const squares = current.squares.slice();
      const winner = calculateWinner(squares);
      if (winner==='X' || winner ==='O' || squares[i]==='X' || squares[i]==='O'){
        return;
      }
      squares[i]=this.state.xIsNext ? 'X' : 'O';
      this.setState({
        history: history.concat([{squares: squares,}]),
        xIsNext: !this.state.xIsNext,
        stepNumber: history.length,
      });
    }

    jumpTo(step) {
      this.setState({
        stepNumber: step,
        xIsNext: (step % 2) === 0,
      })
    }
    
    render() {
      const history = this.state.history;
      const current = history[this.state.stepNumber];
      const winner = calculateWinner(current.squares);
      let status;
      if(winner==='X' || winner ==='O'){
        status = 'Winner ' + winner;
      } else if(winner==='N'){
        status = 'Draw';
      } else {
        status = 'Next player: '+ (this.state.xIsNext ? 'X' : 'O');
      }
      return (
        <View style={{padding: 10, justifyContent: "center", paddingHorizontal: 10}}>
          <View style={styles.menu}>
            <TouchableHighlight onPress={()=> this.jumpTo(0)}><View><Image style={styles.menuImage} source={require("./new.png")}/></View></TouchableHighlight>
            <TouchableHighlight onPress={()=> this.jumpTo(this.state.stepNumber-1)}><View><Image style={styles.menuImage} source={require("./undo.png")}/></View></TouchableHighlight>
          </View>
          <View style={{flexDirection: 'row', justifyContent: "center",}}>
            <TouchableHighlight onPress={() => this.handleClick(0)}><View style={styles.Square}>{squareRender(current.squares[0])}</View></TouchableHighlight>
            <TouchableHighlight onPress={() => this.handleClick(1)}><View style={styles.Square}>{squareRender(current.squares[1])}</View></TouchableHighlight>
            <TouchableHighlight onPress={() => this.handleClick(2)}><View style={styles.Square}>{squareRender(current.squares[2])}</View></TouchableHighlight>
          </View>
          <View style={{flexDirection: 'row', justifyContent: "center",}}>
            <TouchableHighlight onPress={() => this.handleClick(3)}><View style={styles.Square}>{squareRender(current.squares[3])}</View></TouchableHighlight>
            <TouchableHighlight onPress={() => this.handleClick(4)}><View style={styles.Square}>{squareRender(current.squares[4])}</View></TouchableHighlight>
            <TouchableHighlight onPress={() => this.handleClick(5)}><View style={styles.Square}>{squareRender(current.squares[5])}</View></TouchableHighlight>
          </View>
          <View style={{flexDirection: 'row', justifyContent: "center",}}>
            <TouchableHighlight onPress={() => this.handleClick(6)}><View style={styles.Square}>{squareRender(current.squares[6])}</View></TouchableHighlight>
            <TouchableHighlight onPress={() => this.handleClick(7)}><View style={styles.Square}>{squareRender(current.squares[7])}</View></TouchableHighlight>
            <TouchableHighlight onPress={() => this.handleClick(8)}><View style={styles.Square}>{squareRender(current.squares[8])}</View></TouchableHighlight>
          </View>
          <View style={styles.Status}>
            <Text style={styles.StatusText}>{status}</Text>
          </View>
        </View>
      );
    }
  }
  const squareRender = (squareText) =>{
    if (squareText==='X'){
      return <Image style={styles.SquareImage} source={require("./x.png")}/>;
    }
    else if (squareText==='O'){
      return <Image style={styles.SquareImage} source={require("./o.png")}/>;
    } else{
      return <Text style={styles.SquareText}>{squareText}</Text>;
    }
      
  }
  
  const styles = StyleSheet.create({
    Square: {
      marginRight: -1,
      marginTop: -1,
      borderWidth: 1,
      borderColor: 'black',
      height: 100,
      width: 100,
      alignContent: 'center',
      alignItems: "center",
      backgroundColor: "white",
      padding: 0,
    },
    SquareText: {
      fontSize: 64,
      fontWeight: 'bold',
      textAlign: 'center',
    },
    SquareImage: {
      width: 95,
      height: 95,
      alignContent: 'center',
      padding: 0,
      backgroundColor: "white",
      alignItems: "center",
    },
    Status: {
      flexDirection: 'row', 
      justifyContent: "center",
      paddingTop: 50,
    },
    StatusText: {
      fontSize: 34,
      fontWeight: 'bold',
    },
    menu: {
      flexDirection: 'row', 
      justifyContent: "flex-end",
      paddingBottom: 30,
      paddingTop: 10
    },
    menuImage: {
      width: 50,
      height: 50,
      paddingRight: 20,
    

    },
  });

  export default Game;
  
  
  