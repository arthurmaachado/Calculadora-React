import React, {useState, useEffect} from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBackspace } from '@fortawesome/free-solid-svg-icons'

const history = [{
    expressao : 'Expressao',
    calculo : 'Resultado',
}]

//Componente que exibe o histórico das 5 operações mais recentes
export const Container = (props) => {
    const renHistory = props.text.slice(-5).map((data,index) => {
        return (
            <p key={index}>{data.expressao} = {data.calculo}</p>
        )
    })
    return(
        <div className='container'>
            {renHistory}
        </div>
    )
}

//Componente do Display
export const Display = (props) => {
    return (
        <div className='display'>
            <div className='operador-anterior'>{props.valorAnterior + props.opr}</div>
            <div className='operador-atual'>{props.valor}</div>
        </div>
    )
}

//Componente do Botão
export const Button = (props) => {
    return (
        <button style={props.style} onClick={()=> props.click && props.click(props.value)}>{props.value}</button>
        
    )
}

//Componente da Calculadora
export const Calculadora = (props) => {
    const element = <FontAwesomeIcon icon={faBackspace} />

    const [resultado,setResultado] = useState('')
    const [resultadoAnterior,setResultadoAnterior] = useState('')
    const [operacao,setOperacao] = useState('')
    
   
    const umSobre = () =>{
        setResultado(String(1/parseFloat(resultado)))
        history.push({'expressao':`1/${resultado}`,'calculo':1/parseFloat(resultado)})
    }

    const elevaQuadrado = () =>{
        setResultado(String(Math.pow(parseFloat(resultado),2)))
        history.push({'expressao':`${resultado}^2`,'calculo':`${Math.pow(parseFloat(resultado),2)}`})
    }

    const clearE = ()=> {
        setResultado('')
    }

    const clearDisplay = ()=>{
        setResultado('')
        setResultadoAnterior('')
        setOperacao('')
    }
    
    const changeSingal = () =>{
        setResultado(- resultado)
    }

    const appendNum = (num) => {
        if(num ==='.' && resultado.includes('.')) return
        setResultado(resultado + num)
    } 

    const chooseOp = (op) =>{
        setOperacao(op)
        if(resultado === '') return
        if(resultadoAnterior !== '') {
            setResultadoAnterior(eval(`${resultadoAnterior}${op}${resultado}`))
            setResultado('')
        }else {
            setResultadoAnterior(resultado)
            setResultado('')   
        } 
    }

    const calcResult = () =>{
        let result
        const atual = parseFloat(resultado)
        const anterior = parseFloat(resultadoAnterior)
        if (isNaN(anterior) || isNaN(atual)) return

        switch(operacao){
            case '+':
                result = anterior + atual
                break
            case '-':
                result = anterior - atual
                break
            case '*':
                result = anterior * atual
                break
            case '÷':
                result = anterior / atual
                break
            default:
                return
        }
        result.toString()
        setResultado(result)
        history.push({'expressao':anterior + operacao + atual,'calculo':result})
        setOperacao('')
        setResultadoAnterior('') 
    }
    
    const deleteNum = ()=> {
        setResultado(resultado.slice(0,-1))
    }

    return(
            <>
            <Container text={history}/>
            <div className='calculadora'>
                <Display valor={resultado} valorAnterior={resultadoAnterior} opr={operacao}/>
                <Button value={'CE'} click={()=> clearE()}/>
                <Button value={'C'} click={()=> clearDisplay()}/>
                <Button value={element} style={{'gridColumn': 'span 2'}} click={()=>deleteNum()}/>
                <Button value={'1/x'} click={()=> umSobre()}/>
                <Button value={'x^2'} click={()=> elevaQuadrado()}/>
                <Button value={'- | +'} click={()=>changeSingal()}/>
                <Button value={'÷'} click={()=> chooseOp('÷')}/>
                <Button value={'7'} click={()=> appendNum('7')}/>
                <Button value={'8'} click={()=> appendNum('8')}/>
                <Button value={'9'} click={()=> appendNum('9')}/>
                <Button value={'*'} click={()=> chooseOp('*')}/>
                <Button value={'4'} click={()=> appendNum('4')}/>
                <Button value={'5'} click={()=> appendNum('5')}/>
                <Button value={'6'} click={()=> appendNum('6')}/>
                <Button value={'-'} click={()=> chooseOp('-')}/>
                <Button value={'1'} click={()=> appendNum('1')}/>
                <Button value={'2'} click={()=> appendNum('2')}/>
                <Button value={'3'} click={()=> appendNum('3')}/>
                <Button value={'+'} click={()=> chooseOp('+')}/>
                <Button value={'0'} click={()=> appendNum('0')}/>
                <Button value={'.'} click={()=> appendNum('.')}/>
                <Button value={'='} style={{'gridColumn':'span 2'}} click={()=> calcResult()}/>
            </div>
            </>
    )
}

//Renderização do DOM
ReactDOM.render(<Calculadora/>,document.getElementById('root'))