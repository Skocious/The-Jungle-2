/** -----------------------------------------------------Create Group------------------------------------------------------------ */
// const userId = localStorage.getItem("userId").value;
const userId = 1;
async function createGroup() {
    const groupName = document.getElementById("groupName").value.trim();
    const groupAbout = document.getElementById("groupAbout").value.trim();
    let groupCreated = { "groupId": 0, "userId": userId, "groupName": groupName, "groupAbout": groupAbout, "imageFormat": "imageFormat" };

    if (groupName.length === 0 && groupAbout.length === 0) {
        const groupNameNull = document.getElementById("groupNameNull");
        const groupAboutNull = document.getElementById("groupAboutNull");
        groupAboutNull.style.display = "block";
        groupNameNull.style.display = "block";
    }

    if (groupName.length === 0) {
        const groupNameNull = document.getElementById("groupNameNull");
        groupNameNull.style.display = "block";
        return;
    }

    if (groupAbout.length === 0) {
        const groupAboutNull = document.getElementById("groupAboutNull");
        groupAboutNull.style.display = "block";
        return;
    }

    if (groupName.length < 3) {
        const groupNameThreeChar = document.getElementById("groupNameThreeChar");
        groupNameThreeChar.style.display = "block";
        return;
    }

    if (groupName.length > 40) {
        const groupNameFortyChar = document.getElementById("groupNameFortyChar");
        groupNameFortyChar.style.display = "block";
        return;
    }

    if (groupAbout.length > 500) {
        const groupAbout500Char = document.getElementById("groupAbout500Char");
        groupAbout500Char.style.display = "block";
        return;
    }

    let response = await fetch("http://127.0.0.1:5000/" + "group/create", {
        method: "POST",
        mode: "cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(groupCreated)
    });

    let groupObject = await response.json();

    if (groupObject.message) {
        let groupNameException = document.getElementById("duplicateGroupNameMessage");
        groupNameException.textContent = groupObject.message;
        duplicateGroupNameMessage.style.display = "block";
    } else {
        let messageGroupCreated = document.getElementById("messageGroupCreated");
        messageGroupCreated.style.display = "block";
    }
}

const submitCreateGroup = document.getElementById("submitCreateGroup");
submitCreateGroup.addEventListener("click", createGroup);