// Fetch Midterm Grade using Fetch API with CORS proxy
fetch('https://api.allorigins.win/get?url=' + encodeURIComponent('http://class-grades-cs.mywebcommunity.org/grades_api.php?surname=Alberio&id_number=2340054'))
.then(response => {
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json();
})
.then(data => {
    console.log('Response:', data);
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(data.contents, 'text/xml');
    
    // Find the student with matching ID
    const students = xmlDoc.getElementsByTagName('student');
    for (let student of students) {
        const studentId = student.getElementsByTagName('student_id')[0]?.textContent;
        if (studentId === '2340054') {
            const midtermGrade = student.getElementsByTagName('midterm_grade')[0]?.textContent || 'N/A';
            document.getElementById('midtermGrade').textContent = midtermGrade;
            break;
        }
    }
})
.catch(error => {
    console.error('Error fetching midterm grade:', error);
    document.getElementById('midtermGrade').textContent = 'Error';
});

// Fetch Final Grade using XMLHttpRequest with CORS proxy
const xhr = new XMLHttpRequest();
xhr.open('GET', 'https://api.allorigins.win/get?url=' + encodeURIComponent('http://class-grades-cs.mywebcommunity.org/grades_api.php?surname=Alberio&id_number=2340054'), true);

xhr.onload = function() {
    if (xhr.status === 200) {
        try {
            const response = JSON.parse(xhr.responseText);
            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(response.contents, 'text/xml');
            
            // Find the student with matching ID
            const students = xmlDoc.getElementsByTagName('student');
            for (let student of students) {
                const studentId = student.getElementsByTagName('student_id')[0]?.textContent;
                if (studentId === '2340054') {
                    const finalGrade = student.getElementsByTagName('final_grade')[0]?.textContent || 'N/A';
                    document.getElementById('finalGrade').textContent = finalGrade;
                    break;
                }
            }
        } catch (error) {
            console.error('Error parsing final grade:', error);
            document.getElementById('finalGrade').textContent = 'Error';
        }
    } else {
        console.error('XHR Status:', xhr.status);
        document.getElementById('finalGrade').textContent = 'Error';
    }
};

xhr.onerror = function() {
    console.error('XHR Request failed');
    document.getElementById('finalGrade').textContent = 'Error';
};

xhr.send();