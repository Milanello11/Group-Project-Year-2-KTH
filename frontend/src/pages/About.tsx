import React from "react";

const About: React.FC = () => {
    return (
        <div>
            <h3> SPA App - About</h3>
            <p> This is a paragraph on the About of the SPA App</p>
            <p> The Team</p>
            <table>
                <thead>
                <tr>
                    <th> ID</th>
                    <th> Name</th>
                    <th> Email</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>1</td>
                    <td>Elias Pececnik Almlöf</td>
                    <td>eliapa@kth.se</td>
                </tr>
                <tr>
                    <td>2</td>
                    <td>Max Masuch</td>
                    <td>masuch@kth.se</td>
                </tr>
                <tr>
                    <td>3</td>
                    <td>Johan Karlsson</td>
                    <td>johkar2@kth.se</td>
                </tr>
                <tr>
                    <td>4</td>
                    <td>Milan Hatami</td>
                    <td>milanh@kth.se</td>
                </tr>
                <tr>
                    <td>5</td>
                    <td>Ismail Mohammed</td>
                    <td>iamoh@kth.se</td>
                </tr>
                </tbody>
            </table>
        </div>
    );
}

export default About;