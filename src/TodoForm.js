import {useState} from "react"
import { Button, Container, Form } from "react-bootstrap"
import axios from "axios"


const TodoForm = ({insertTodo,listTodo})=>{
    const [formContent, setFormContent] = useState({
        subject: '',
        name: '',
        summary: ''
    })

    const getValue = (e)=>{
        setFormContent({
            ...formContent,
            [e.target.name]: e.target.value
        })
    }


//submit(추가)
const submitTodo =()=>{
    axios.post('todo/insert', {
        subject : formContent.subject,
        name : formContent.name,
        summary : formContent.summary
    }).then(()=>{
        alert('등록완료')
        listTodo();
    })
}



    return(
        <Container>
        <Form>
        <Form.Group className="mb-3" controlId="subject">
          <Form.Label>subject</Form.Label>
          <Form.Control type="text" placeholder="subject" name="subject"
          onChange={getValue} value={formContent.subject}/>
        </Form.Group>
        <Form.Group className="mb-3" controlId="name">
          <Form.Label>name</Form.Label>
          <Form.Control type="text" placeholder="name" name="name"
          onChange={getValue} value={formContent.name}/>
        </Form.Group>
        <Form.Group className="mb-3" controlId="summary">
          <Form.Label>summary</Form.Label>
          <Form.Control as="textarea"  rows={10} cols={30} name="summary" 
          onChange={getValue} value={formContent.summary}/><br/>
          <Button variant="outline-info" onClick={()=>insertTodo(formContent)}>전송1</Button>
          <Button variant="outline-danger" onClick={submitTodo}>전송2</Button>
        </Form.Group>
      </Form>
    </Container>
    );
}
export default TodoForm;