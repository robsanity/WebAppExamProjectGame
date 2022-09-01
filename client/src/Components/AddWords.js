import { useState } from "react";
import { Table } from "react-bootstrap";


function AddWords(props) {
  const [word, setWord] = useState("");
  


  const everyWordRound = () => {
    for (let i = 0; i < props.inserted.length; i++) {
      props.sendRound(
        props.lastRoundId,
        props.users,
        props.letter,
        props.inserted[i],
        props.category,
        props.score
      );
    }
  };

  const addInserted = (word) => {
    props.setInserted([...props.inserted,word])
    }

    const handleSubmit =  () => {
      let i = 0;
      if(word === ""){
        setWord("");
      }else{
        props.Validate(props.category, word, props.letter)
        while(props.validity == true){
          addInserted(word);
          props.getScore(
            props.users,
            props.inserted[i],
            props.category,
            props.letter
          );
          i++;
          setWord("");
          }
          alert("Not correct word");
          setWord("");
          }
        }
      
    
    
      
    



  
  return (
    <>
      {props.timer === 0 ? (
        <Table class="table table-sm" inserted={props.inserted}>
          <thead>
            <tr>
              <th scope="col">Inserted Words</th>
            </tr>
          </thead>
          <tbody>
            <button
              onClick={() => {
                everyWordRound();
                props.setTimer("");
                props.setCategory("");
                props.setDifficult("");
                props.setLetter("");
                props.setUnit(1);
                props.setInserted([]);
                props.setMinWords(0);
                props.setScore(0);
              }}
            >
              Send Result
            </button>
            {props.inserted.length >= props.minWords ? (
              <>
                <tr>
                  <td>{props.inserted + "  "}</td>
                </tr>
                <tr>
                  <td>
                    <h5>Your Score Is {props.score}</h5>
                  </td>
                </tr>
              </>
            ) : (
              <>
                <tr>
                  <td>{props.inserted + "  "}</td>
                </tr>
                <tr>
                  <td>
                    <h5>Nice Try, but not Enough Words</h5>
                  </td>
                </tr>
              </>
            )}
          </tbody>
          <button
            id="btn11"
            type="button"
            class="btn btn-dark"
            onClick={() => {
              props.setTimer("");
              props.setCategory("");
              props.setDifficult("");
              props.setLetter("");
              props.setUnit(1);
              props.setInserted([]);
              props.setMinWords(0);
              props.setScore(0);
            }}
          >
            Play Again!
          </button>
        </Table>
      ) : props.timer !== "" ? (
        <>
          <td>
            <input
              id="box"
              type="text"
              value={word}
              onChange={(event) => {
                setWord(event.target.value);
              }}
            />
          </td>
          <input
            id="sendButton"
            class="btn btn-dark"
            type="submit"
            value="Send Word"
            onClick={handleSubmit}
          />
          <button
            id="btn11"
            type="button"
            class="btn btn-dark"
            onClick={() => {
              props.setUnit(props.timer - 1);
            }}
          >
            Stop Time and Send
          </button>
          <table class="table table-sm" inserted={props.inserted}>
            <thead>
              <tr>
                <th scope="col">Inserted Words </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{props.inserted + "  "}</td>
              </tr>
            </tbody>
          </table>
        </>
      ) : (
        <></>
      )}
    </>
  );
      }

export default AddWords;
