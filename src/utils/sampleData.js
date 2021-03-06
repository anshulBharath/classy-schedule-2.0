/***
 * This is where all our sample data is housed.
 */

/**
 * Sample Data for Courses. Feel free to add and adjust
 */
export const sampleCourses = [
    {
        "program": "CISC",
        "number": 131,
        "name": "Intro to Programming",
        "courseID": 1234,
        "credits": 4,
        "capacity": 20
    },
    {
        "program": "CISC",
        "number": 230,
        "name": "Object Oriented Programming",
        "courseID": 1233,
        "credits": 4,
        "capacity": 20
    },
    {
        "program": "STAT",
        "number": 200,
        "name": "Statistics",
        "courseID": 1232,
        "credits": 4,
        "capacity": 20
    },
    {
        "program": "STAT",
        "number": 440,
        "name": "Data Mining",
        "courseID": 1234,
        "credits": 4,
        "capacity": 20
    }
]

export const samplePrograms = [
    {
        "id": 1,
        "name": "STAT"
    },
    {
        "id": 2,
        "name": "MATH"
    },
    {
        "id": 3,
        "name": "GEO"
    },
    {
        "id": 4,
        "name": "MUSC"
    }
]
/**
 * Sample data for labs.
 */
export const sampleLabs = [
    {
        "lname": "Intro to Programming",
        "lcourse": [{
            "program": "CISC",
            "number": 131,
            "name": "Intro to Programming",
            "courseID": 1234,
            "credits": 4,
            "capacity": 20
        }]
    }
]

/**
 * Sample data for professors.
 */
export const sampleProfessors = [
    {
        "firstName": "Jason",
        "lastName": "Sawin",
        "program": "CISC"
    },
    {
        "firstName": "Sarah",
        "lastName": "Miracle",
        "program": "CISC"
    },
    {
        "firstName": "Amelia",
        "lastName": "McNamara",
        "program": "STAT"
    }
]

/**
 * Sample data for rooms.
 */
export const sampleRooms = [
    {
        "rnumber": "432",
        "rbuilding": "OSS"
    },
    {
        "rnumber": "415",
        "rbuilding": "OSS"
    },
    {
        "rnumber": "420",
        "rbuilding": "OSS"
    }  
]
export const samplePlans = [
        {
            "plan_id": "1234",
            "plan_name": "planA",
            "plan_description": "test plan A",
            "semester_year": "2021",
            "semester_num": "1",        
        },
        {
            "plan_id": "2343",
            "plan_name": "planB",
            "plan_description": "test plan B",
            "semester_year": "2022",
            "semester_num": "3", 
        }


    
]