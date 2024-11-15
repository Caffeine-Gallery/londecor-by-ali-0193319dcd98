import Int "mo:base/Int";

import Array "mo:base/Array";
import Text "mo:base/Text";
import Time "mo:base/Time";
import Buffer "mo:base/Buffer";

actor {
    // Types for our data structures
    type Project = {
        id: Text;
        title: Text;
        description: Text;
        imageUrl: Text;
        category: Text;
        timestamp: Time.Time;
    };

    type ContactMessage = {
        name: Text;
        email: Text;
        message: Text;
        timestamp: Time.Time;
    };

    // Stable storage
    private stable var projects : [Project] = [];
    private stable var messages : [ContactMessage] = [];

    // Add a new project
    public func addProject(title: Text, description: Text, imageUrl: Text, category: Text) : async Text {
        let project : Project = {
            id = Text.concat(title, Int.toText(Time.now()));
            title = title;
            description = description;
            imageUrl = imageUrl;
            category = category;
            timestamp = Time.now();
        };
        
        let projectsBuffer = Buffer.fromArray<Project>(projects);
        projectsBuffer.add(project);
        projects := Buffer.toArray(projectsBuffer);
        
        return project.id;
    };

    // Get all projects
    public query func getProjects() : async [Project] {
        return projects;
    };

    // Submit contact message
    public func submitContact(name: Text, email: Text, message: Text) : async () {
        let contactMsg : ContactMessage = {
            name = name;
            email = email;
            message = message;
            timestamp = Time.now();
        };
        
        let messagesBuffer = Buffer.fromArray<ContactMessage>(messages);
        messagesBuffer.add(contactMsg);
        messages := Buffer.toArray(messagesBuffer);
    };
};
