const assignment = {
    id: 1,
    title: "NodeJS Assignment",
    description: "Create a NodeJS server with ExpressJS",
    due: "2021-10-10",
    completed: false,
    score: 0,
};

const todos = [
    { id: 1, title: "Task 1", completed: false, description: '', due: '' },
    { id: 2, title: "Task 2", completed: false, description: '', due: '' },
    { id: 3, title: "Task 3", completed: false, description: '', due: '' },
    { id: 4, title: "Task 4", completed: false, description: '', due: '' },
];
  

const Lab5 = (app) => {
    app.get("/a5/welcome", (req, res) => {
        res.send("Welcome to Assignment 5");
    });
    app.get("/a5/add/:a/:b", (req, res) => {
        const { a, b } = req.params;
        const sum = parseInt(a) + parseInt(b);
        res.send(sum.toString());
    });
    app.get("/a5/subtract/:a/:b", (req, res) => {
        const { a, b } = req.params;
        const sum = parseInt(a) - parseInt(b);
        res.send(sum.toString());
    });
    app.get("/a5/calculator", (req, res) => {
        const { a, b, operation } = req.query;
        let result = 0;
        switch (operation) {
            case "add":
            result = parseInt(a) + parseInt(b);
            break;
            case "subtract":
            result = parseInt(a) - parseInt(b);
            break;
            default:
            result = "Invalid operation";
        }
        res.send(result.toString());
    });
    app.get("/a5/assignment", (req, res) => {
        res.json(assignment);
    });
    app.get("/a5/assignment/title", (req, res) => {
        res.json(assignment.title);
    });
    app.get("/a5/assignment/title/:newTitle", (req, res) => {
        const { newTitle } = req.params;
        assignment.title = newTitle;
        res.json(assignment);
    });
    app.get("/a5/assignment/score", (req, res) => {
        res.json(assignment.score);
    });
    app.get("/a5/assignment/score/:newScore", (req, res) => {
        const { newScore } = req.params;
        assignment.score = parseInt(newScore);
        res.json(assignment);
    });
    app.get("/a5/assignment/completed", (req, res) => {
        res.json(assignment.completed);
    });
    app.get("/a5/assignment/completed/:newCompleted", (req, res) => {
        const { newCompleted } = req.params;
        assignment.completed = newCompleted == 'true';
        res.json(assignment);
    });

    app.get("/a5/todos", (req, res) => {
        const { completed } = req.query;
        if (completed !== undefined) {
            const isCompleted = completed == 'true'
            const completedTodos = todos.filter((t) => t.completed === isCompleted);
            res.json(completedTodos);
            return;
        }
        res.json(todos);
    });
    app.post("/a5/todos", (req, res) => {
        const newTodo = {
          ...req.body,
          id: new Date().getTime(),
        };
        todos.push(newTodo);
        res.json(newTodo);
    });
    app.get("/a5/todos/:id", (req, res) => {
        const { id } = req.params;
        const todo = todos.find((t) => t.id === parseInt(id));
        if (!todo) {
            res
            .status(404)
            .json({ message: `Unable to find Todo with ID ${id}` });
            return;
        }
        res.json(todo);
    });
    app.delete("/a5/todos/:id", (req, res) => {
        const { id } = req.params;
        const todo = todos.find((t) => t.id === parseInt(id));
        if (!todo) {
            res
            .status(404)
            .json({ message: `Unable to delete Todo with ID ${id}` });
            return;
        }
        todos.splice(todos.indexOf(todo), 1);
        res.sendStatus(200);
    });
    app.put("/a5/todos/:id", (req, res) => {
        const { id } = req.params;
        const todo = todos.find((t) => t.id === parseInt(id));
        if (!todo) {
            res
            .status(404)
            .json({ message: `Unable to update Todo with ID ${id}` });
            return;
        }
        todo.title = req.body.title;
        todo.description = req.body.description;
        todo.due = req.body.due;
        todo.completed = req.body.completed;
        res.sendStatus(200);
    });
    app.get("/a5/todos/:id/title/:title", (req, res) => {
        const { id, title } = req.params;
        const todo = todos.find((t) => t.id === parseInt(id));
        if (!todo) {
            res
            .status(404)
            .json({ message: `Unable to update title for Todo with ID ${id}` });
        }
        todo.title = title;
        res.json(todos);
    });    
    app.get("/a5/todos/:id/completed/:newCompleted", (req, res) => {
        const { id, newCompleted } = req.params;
        const todo = todos.find((t) => t.id === parseInt(id));
        if (!todo) {
            res
            .status(404)
            .json({ message: `Unable to update completed for Todo with ID ${id}` });
        }
        todo.completed = newCompleted == 'true';
        res.json(todos);
    });
    app.get("/a5/todos/:id/description/:newDescription", (req, res) => {
        const { id, newDescription } = req.params;
        const todo = todos.find((t) => t.id === parseInt(id));
        if (!todo) {
            res
            .status(404)
            .json({ message: `Unable to update description for Todo with ID ${id}` });
        }
        todo.description = newDescription;
        res.json(todos);
    });
    app.get("/a5/todos/:id/due/:newDue", (req, res) => {
        const { id, newDue } = req.params;
        const todo = todos.find((t) => t.id === parseInt(id));
        if (!todo) {
            res
            .status(404)
            .json({ message: `Unable to update due date for Todo with ID ${id}` });
        }
        todo.due = newDue;
        res.json(todos);
    });
};

export default Lab5;