import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

  const calculateWinner = (squares) =>{
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
    }
    return ' ';
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
      const moves = history.map((step,move) => {
        const desc = move ? 
          'Go to move #' + move :
          'Go to game start';
        return (
         <Button key={move} onPress={()=> this.jumpTo(move)} title={desc}/>
        )
      });
      let status;
      if(winner==='X' || winner ==='O'){
        status = 'Winner ' + winner;
      } else{
        status = 'Next player: '+ (this.state.xIsNext ? 'X' : 'O');
      }
      return (
        <View>
          <View>
          <View style={{flex: 1, flexDirection: 'row', top: 50}}>
            <View style={styles.Square}><Button title={current.squares[0]} onPress={() => this.handleClick(0)}/></View>
            <View style={styles.Square}><Button title={current.squares[1]} onPress={() => this.handleClick(1)}/></View>
            <View style={styles.Square}><Button title={current.squares[2]} onPress={() => this.handleClick(2)}/></View>
          </View>
          <View style={{flex: 1, flexDirection: 'row', top: 100}}>
            <View style={styles.Square}><Button title={current.squares[3]} onPress={() => this.handleClick(3)}/></View>
            <View style={styles.Square}><Button title={current.squares[4]} onPress={() => this.handleClick(4)}/></View>
            <View style={styles.Square}><Button title={current.squares[5]} onPress={() => this.handleClick(5)}/></View>
          </View>
          <View style={{flex: 1, flexDirection: 'row', top: 150}}>
            <View style={styles.Square}><Button title={current.squares[6]} onPress={() => this.handleClick(6)}/></View>
            <View style={styles.Square}><Button title={current.squares[7]} onPress={() => this.handleClick(7)}/></View>
            <View style={styles.Square}><Button title={current.squares[8]} onPress={() => this.handleClick(8)}/></View>
          </View>
        </View>
            <View style={{width: 160, top: 220 }}><Text>{status}</Text></View>
            <View style={{width: 160, top: 250 }}>{moves}</View>
        </View>
      );
    }
  }

  const styles = StyleSheet.create({
    Square: {
      backgroundColor: 'white',
      fontSize: 24,
      fontWeight: 'bold',
      height: 34,
      marginRight: -1,
      marginTop: -1,
      padding: 0,
      textAlign: 'center',
      width: 34,
    },
  });

  export default Game;
  
  
  