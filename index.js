import express from "express";
import bodyParser from "body-parser";
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const app = express();
const port = 3000;
const __dirname = dirname(fileURLToPath(import.meta.url));

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: true })); 

// aim:
/**
 * add: O(1)
 * delete: O(1)
 * select k largest: O(1)
 * searching: O(1)
 */

const data = [];

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

app.get("/", (req, res) => {
    const homeData = searchBasedOnTopic("");
    res.render(__dirname + "/views/index.ejs", {
        data: homeData
    });
    console.log(data);
    console.log(homeData);
});

app.get("/fass", (req, res) => {
    const fassData = searchBasedOnTopic("fass");
    res.render(__dirname + "/views/fass.ejs", {
        data: fassData
    });
});

app.get("/business", (req, res) => {
    const businessData = searchBasedOnTopic("business");
    res.render(__dirname + "/views/business.ejs", {
        data: businessData
    });
});

app.get("/computing", (req, res) => {
    const computingData = searchBasedOnTopic("computing");
    res.render(__dirname + "/views/computing.ejs", {
        data: computingData
    });
});

app.get("/engineering" , (req, res) => {
    const engineeringData = searchBasedOnTopic("engineering");
    res.render(__dirname + "/views/engineering.ejs", {
        data: engineeringData
    });
});

app.get("/science", (req, res) => {
    const scienceData = searchBasedOnTopic("science");
    res.render(__dirname + "/views/science.ejs", {
        data: scienceData
    });
});

app.get("/medicine", (req, res) => {
    const medicineData = searchBasedOnTopic("medicine");
    res.render(__dirname + "/views/medicine.ejs", {
        data: medicineData
    });
});

app.get("/law", (req, res) => {
    const lawData = searchBasedOnTopic("law");
    res.render(__dirname + "/views/law.ejs", {
        data: lawData
    });
});

app.get("/create", (req, res) => {
    res.render(__dirname + "/views/create.ejs");
});

app.post("/create", (req, res) => {
    console.log(req.body);
    const name = savePostToServer(req.body);
    res.send(name);
});

function savePostToServer(msg) {
    if (!msg["topic"]) {
        return false;
    } else if (!msg["content"]) {
        return false;
    } else if (!msg["name"]) {
        var randNumber = Math.floor(Math.random() * 10000);
        msg["name"] = "Anonimous" + randNumber;
    }
    data.push(msg); 
    return msg["name"];
}

function searchBasedOnTopic(topic) {
    const newData = [];
    if (topic === "") {
        for (let i = 0; i < data.length; i++) {
            const item = {
                topic: formatTopic(data[i]["topic"]),
                name: data[i]["name"],
                content: data[i]["content"]
            };
            newData.push(item);
        }
    } else {
        for (let i = 0; i < data.length; i++) {
            if (data[i]["topic"] == topic) {
                const item = {
                    topic: formatTopic(topic),
                    name: data[i]["name"],
                    content: data[i]["content"]
                };
                newData.push(item);
            }
        }
    }
    return newData;
}

function formatTopic(topic) {
    console.log("Topic: " + topic);
    switch (topic) {
        case "fass":
            return "Faculty of Arts & Social Sciences";
        case "business":
            return "Business School";
        case "computing":
            return "School of Computing";
        case "engineering":
            return "College of Design & Engineering";
        case "science":
            return "Faculty of Science";
        case "medicine":
            return "School of Medicine";
        case "law":
            return "Faculty of Law";
        default: 
            return "Unknown topic";
    }
}