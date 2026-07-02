(async function checkForUpdates() {
    const currentVersion = "1.0";
    const versionUrl = "https://raw.githubusercontent.com/ivysone/Will-you-be-my-Valentine-/main/version.json";

    try {
        const response = await fetch(versionUrl);
        if (!response.ok) {
            console.warn("Could not fetch version information.");
            return;
        }

        const data = await response.json();
        const latestVersion = data.version;
        const updateMessage = data.updateMessage;

        if (currentVersion !== latestVersion) {
            alert(updateMessage);
        } else {
            console.log("You are using the latest version.");
        }
    } catch (error) {
        console.error("Error checking for updates:", error);
    }
})();

const noClickQuestions = [
    "Would you consider formalizing 6-month and year-long internships with fair academic credits?",
    "Should research and on-campus summer internships receive academic credit?",
    "Can company schedules be released earlier and with greater transparency?",
    "Should TnP coordinator selection be standardized, similar to mentor selection, for better accountability and approachability?",
    "Can we ensure equal priority and fair opportunity for all departments and all roles?",
    "Should clubs like Tesla, Team Velocity, IV Labs, ACM, and Syntax receive stronger industry tie-ups, research project support, and infrastructure assistance?",
    "Can we create better opportunities for students pursuing minors?",
    "Should dedicated TnP slots and attendance support policies be provided?"
];

let noClickCount = 0;

// Reference to the background song
const backgroundSong = document.getElementById("backgroundSong");

function restartAnimation(element, className) {
    if (!element) {
        return;
    }
    element.classList.remove(className);
    void element.offsetWidth;
    element.classList.add(className);
}

function handleNoClick() {
    const questionText = document.getElementById("question-text");
    const noButton = document.getElementById("no-button");
    const yesButton = document.getElementById("yes-button");
    const mainContainer = document.getElementById("main-container");
    const buttons = document.querySelector(".buttons");
    const h5Element = document.getElementById("minnuvinay");

    noClickCount += 1;

    if (noClickCount <= noClickQuestions.length && questionText) {
        questionText.textContent = noClickQuestions[noClickCount - 1];
        restartAnimation(questionText, "text-reveal");
    }

    if (mainContainer) {
        mainContainer.classList.toggle("final-stage-7", noClickCount >= 7);
    }

    if (buttons) {
        buttons.classList.toggle("final-stage-7", noClickCount >= 7);
    }

    if (noClickCount <= 6 && yesButton && noButton) {
        const stage = noClickCount;
        const isCompact = window.matchMedia("(max-width: 640px)").matches;
        const widthBase = isCompact ? 42 : 28;
        const widthStep = stage <= 3 ? (isCompact ? 5 : 6.5) : (isCompact ? 10 : 12.5);
        const heightBase = isCompact ? 12 : 14;
        const heightStep = stage <= 3 ? (isCompact ? 4.25 : 4.5) : (isCompact ? 8.5 : 10);
        const yesWidthVw = Math.min(isCompact ? 94 : 98, widthBase + stage * widthStep);
        const yesHeightVh = Math.min(isCompact ? 74 : 88, heightBase + stage * heightStep);
        const yesFontSizeEm = 1.34 + stage * 0.16;
        const yesScale = 1 + stage * 0.035;

        yesButton.style.fontSize = `${yesFontSizeEm}em`;
        yesButton.style.padding = `${12 + stage * 2}px ${22 + stage * 4.5}px`;
        yesButton.style.width = `${yesWidthVw}vw`;
        yesButton.style.maxWidth = isCompact ? "94vw" : "98vw";
        yesButton.style.height = `${yesHeightVh}vh`;
        yesButton.style.minHeight = `${Math.min(isCompact ? 260 : 380, 60 + stage * 48)}px`;
        yesButton.style.maxHeight = isCompact ? "74vh" : "88vh";
        yesButton.style.transform = `scale(${yesScale})`;
        yesButton.style.marginRight = "";

        noButton.style.display = "inline-flex";
        noButton.style.position = "";
        noButton.style.right = "";
        noButton.style.top = "";
        noButton.style.transform = `scale(${Math.max(0.8, 1 - stage * 0.045)}) translateX(${stage * 1.3}px)`;
        noButton.style.opacity = `${Math.max(0.78, 1 - stage * 0.025)}`;
        noButton.style.pointerEvents = "";
        noButton.style.zIndex = "";
        noButton.style.width = "auto";
        noButton.style.height = "auto";
        noButton.style.padding = `${10 + Math.max(0, 4 - stage)}px ${18 + Math.max(0, 3 - stage)}px`;
        restartAnimation(yesButton, "text-reveal");
    }

    if (noClickCount >= 7 && yesButton && noButton) {
        yesButton.style.fontSize = "min(24vw, 24vh)";
        yesButton.style.padding = "0";
        yesButton.style.width = "100%";
        yesButton.style.height = "100%";
        yesButton.style.maxWidth = "100%";
        yesButton.style.marginRight = "0";
        yesButton.style.transform = "scale(1)";

        noButton.style.display = "none";
        if (questionText) {
            questionText.style.display = "none";
        }
        restartAnimation(yesButton, "text-reveal");
    }

    // Hide the <h5> element with the id 'minnuvinay'
    if (h5Element) {
        h5Element.style.display = "none";
    }

    // Play the background song for all messages
    if (backgroundSong) {
        backgroundSong.play();
    }
}

function handleYesClick() {
    window.location.href = "yes_page.html";
}
