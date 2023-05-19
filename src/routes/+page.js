import {collection, getDocs, orderBy, query, where, limit} from "firebase/firestore";
import {firestore} from "$lib/firebase/client.js";

export async function load() {
    // Ref projects and image-grid collections in Firestore
    const projectsRef = query(collection(firestore, 'projects'), where('published', '==', true), limit(3))
    const imageGridRef = query(collection(firestore, 'image-grid'), where('published', '==', true), orderBy('order', 'asc'));

    let projectsList = [];
    let imageGridList = [];

    // Query all projects from the collection
    let projectsDocs = await getDocs(projectsRef);
    let imageGridDocs = await getDocs(imageGridRef);

    // iterate over projectsDocs and imageGridDocs; add their content to projectsList and imageGridList respectively
    for (const doc of projectsDocs.docs) {
        const item = doc.data();
        item.id = doc.id;
        item.createdAt = item.createdAt.toDate();
        item.updatedAt = item.updatedAt.toDate();

        // Force stringify everything with JSON before returning to prevent any non-POJOs that get through and cause 500s
        projectsList.push(JSON.parse(JSON.stringify(item)));
    }

    for (const doc of imageGridDocs.docs) {
        const item = doc.data();
        item.id = doc.id;
        item.createdAt = item.createdAt.toDate();
        item.updatedAt = item.updatedAt.toDate();

        // Force stringify everything with JSON before returning to prevent any non-POJOs that get through and cause 500s
        imageGridList.push(JSON.parse(JSON.stringify(item)));
    }

    return {
        // Return the title for this page, which will be handled in the layout svelte file for SEO
        title: "Home",
        projects: projectsList,
        imageGrid: imageGridList
    }
}