//const { config } = require('dotenv');
const express = require('express');
const config = require('./index');
const cors = require('cors');
const app = express()

app.use(express.json());
app.use(cors('*'))


const studentGrade = [
    {id:1, name:"Amara", subject: "chemistry", score: 65, pass: false},
    {id:2, name:"Gift", subject: "chemistry", score: 75, pass: false},
]

app.get('/studentGrade', (req, res) =>{
    res.status(200).json(studentGrade)
})

app.post('/studentGrade', (req, res) => {
    const newStudentGrade = {id: studentGrade.length + 1, ...req.body};
    studentGrade.push(newStudentGrade);
    res.status(200).json(newStudentGrade)
})

//PATCH Update = Partial
app.patch('/studentGrade/:id', (req, res) => {
    const Student = studentGrade.find((s) => s.id === parseInt (req.params.id));
    if(!studentGrade) return res.status(401).json({message: "Student not found!"})
        Object.assign(studentGrade, req.body)//merge if it's true
    res.status(200).json(Student )
})

//DELETE 
app.delete('/studentGrade/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const initialLength = studentGrade.length;
    studentGrade = studentGrade.filter((s) => s.id !== id);
    if(!studentGrade.length === initialLength)
        return res.status(404).json({error: 'Not Found'});
    res.status(204).send();

})

app.use((err, req, res, next) => {
    res.status(500).json({error: 'Server Error'});
})

app.listen(config.PORT, () =>{
    console.log(`Server is running on port ${config.PORT}`);
})