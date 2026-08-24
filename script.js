/* =====================================================
   MOBILE MENU
===================================================== */

const mobileMenuBtn =
    document.getElementById("mobileMenuBtn");

const mainNav =
    document.getElementById("mainNav");


if (mobileMenuBtn) {

    mobileMenuBtn.addEventListener(
        "click",
        function () {

            mainNav.classList.toggle("active");

        }
    );

}


/* Close mobile menu after clicking link */

document.querySelectorAll("#mainNav a")
    .forEach(function(link) {

        link.addEventListener(
            "click",
            function() {

                mainNav.classList.remove("active");

            }
        );

    });



/* =====================================================
   PREMIUM CALCULATOR
===================================================== */

const premiumForm =
    document.getElementById("premiumForm");

const premiumAmount =
    document.getElementById("premiumAmount");

const paymentAmount =
    document.getElementById("paymentAmount");


if (premiumForm) {

    premiumForm.addEventListener(
        "submit",
        function(event) {

            event.preventDefault();


            const insuranceType =
                document.getElementById(
                    "insuranceType"
                ).value;


            const age =
                Number(
                    document.getElementById(
                        "age"
                    ).value
                );


            const coverage =
                Number(
                    document.getElementById(
                        "coverage"
                    ).value
                );


            const medical =
                document.getElementById(
                    "medical"
                ).value;


            if (!age || age < 18) {

                alert(
                    "Please enter a valid age of 18 or above."
                );

                return;

            }


            /*
             * IMPORTANT:
             *
             * These are DEMONSTRATION values only.
             *
             * Replace this calculation with your
             * authorised insurer/product rate table
             * before using it for real quotations.
             */


            let baseRate = 0;


            switch (insuranceType) {

                case "life":
                    baseRate = 0.004;
                    break;

                case "health":
                    baseRate = 0.012;
                    break;

                case "motor":
                    baseRate = 0.025;
                    break;

                case "travel":
                    baseRate = 0.002;
                    break;

                case "home":
                    baseRate = 0.003;
                    break;

                case "accident":
                    baseRate = 0.0015;
                    break;

                default:
                    baseRate = 0.005;

            }


            /*
             * Age factor
             */

            let ageFactor = 1;


            if (age >= 18 && age <= 30) {

                ageFactor = 1;

            }

            else if (age <= 40) {

                ageFactor = 1.20;

            }

            else if (age <= 50) {

                ageFactor = 1.50;

            }

            else if (age <= 60) {

                ageFactor = 1.90;

            }

            else {

                ageFactor = 2.40;

            }


            /*
             * Medical factor
             */

            let medicalFactor = 1;


            if (medical === "diabetes") {

                medicalFactor = 1.20;

            }

            else if (medical === "hypertension") {

                medicalFactor = 1.15;

            }

            else if (medical === "heart") {

                medicalFactor = 1.50;

            }

            else if (medical === "respiratory") {

                medicalFactor = 1.25;

            }

            else if (medical === "other") {

                medicalFactor = 1.30;

            }


            /*
             * Calculate
             */

            let premium =
                coverage *
                baseRate *
                ageFactor *
                medicalFactor;


            /*
             * Minimum illustrative premium
             */

            if (premium < 1000) {

                premium = 1000;

            }


            premium =
                Math.round(
                    premium / 100
                ) * 100;


            const formattedPremium =
                premium.toLocaleString(
                    "en-IN"
                );


            premiumAmount.textContent =
                "₹" + formattedPremium;


            paymentAmount.textContent =
                "₹" + formattedPremium;


        }
    );

}



/* =====================================================
   PAYMENT BUTTON
===================================================== */

const paymentBtn =
    document.getElementById("paymentBtn");


if (paymentBtn) {

    paymentBtn.addEventListener(
        "click",
        function() {

            const amount =
                paymentAmount.textContent;


            if (amount === "₹0") {

                alert(
                    "Please calculate your premium first."
                );

                document.getElementById(
                    "calculator"
                ).scrollIntoView({
                    behavior: "smooth"
                });

                return;

            }


            alert(
                "Payment gateway is not connected yet.\n\n" +
                "Estimated amount: " +
                amount +
                "\n\n" +
                "Connect an authorised payment gateway " +
                "before accepting real customer payments."
            );

        }
    );

}



/* =====================================================
   CHAT ASSISTANCE
===================================================== */

const chatInput =
    document.getElementById("chatInput");

const chatSend =
    document.getElementById("chatSend");

const chatMessages =
    document.getElementById("chatMessages");



function addChatMessage(
    message,
    sender
) {

    const messageElement =
        document.createElement("div");


    messageElement.className =
        sender === "user"
            ? "user-message"
            : "bot-message";


    messageElement.innerHTML =
        message;


    chatMessages.appendChild(
        messageElement
    );


    chatMessages.scrollTop =
        chatMessages.scrollHeight;

}



/* =====================================================
   CHAT RESPONSE
===================================================== */

function getBotResponse(message) {

    const text =
        message.toLowerCase();


    if (
        text.includes("insurance type") ||
        text.includes("insurance")
    ) {

        return `
            We currently provide information for
            Life, Health, Motor, Travel, Home,
            Business, Personal Accident, Cyber,
            Pet and Crop insurance.
            <br><br>
            You can explore the insurance section
            above for more information.
        `;

    }


    if (
        text.includes("premium") ||
        text.includes("calculator") ||
        text.includes("price")
    ) {

        return `
            You can use our Premium Calculator
            to get an illustrative estimate.
            <br><br>
            Please remember that actual premiums
            depend on the applicable insurer,
            product, underwriting and policy terms.
        `;

    }


    if (
        text.includes("policy") ||
        text.includes("pdf") ||
        text.includes("document")
    ) {

        return `
            Our Policy Documents section is near
            the top of this page.
            <br><br>
            Select "View PDF" or "Download" for
            the applicable document.
        `;

    }


    if (
        text.includes("payment") ||
        text.includes("pay")
    ) {

        return `
            The payment option is located beside
            the Premium Calculator.
            <br><br>
            A real payment gateway must be connected
            before accepting customer payments.
        `;

    }


    if (
        text.includes("contact") ||
        text.includes("phone") ||
        text.includes("email")
    ) {

        return `
            You can contact Life Protection Company Ltd.
            at <b>9059056219</b> or
            <b>mrajeshkhanna9@gmail.com</b>.
        `;

    }


    return `
        Thank you for your question.
        <br><br>
        I can help with:
        <br>
        • Insurance types
        <br>
        • Premium calculator
        <br>
        • Policy documents
        <br>
        • Payment information
        <br>
        • Contact details
    `;

}



/* =====================================================
   SEND CHAT
===================================================== */

function sendChatMessage() {

    const message =
        chatInput.value.trim();


    if (!message) {

        return;

    }


    addChatMessage(
        message,
        "user"
    );


    chatInput.value = "";


    setTimeout(
        function() {

            const response =
                getBotResponse(
                    message
                );


            addChatMessage(
                response,
                "bot"
            );

        },
        500
    );

}



if (chatSend) {

    chatSend.addEventListener(
        "click",
        sendChatMessage
    );

}


if (chatInput) {

    chatInput.addEventListener(
        "keydown",
        function(event) {

            if (
                event.key === "Enter"
            ) {

                sendChatMessage();

            }

        }
    );

}



/* =====================================================
   QUICK CHAT BUTTONS
===================================================== */

function sendQuickMessage(message) {

    if (!chatInput) {

        return;

    }


    chatInput.value =
        message;


    sendChatMessage();

}



/* =====================================================
   SCROLL REVEAL
===================================================== */

const revealElements =
    document.querySelectorAll(
        ".policy-card, .insurance-box, .why-card"
    );


const observer =
    new IntersectionObserver(
        function(entries) {

            entries.forEach(
                function(entry) {

                    if (
                        entry.isIntersecting
                    ) {

                        entry.target.classList.add(
                            "visible"
                        );

                    }

                }
            );

        },
        {
            threshold: 0.1
        }
    );


revealElements.forEach(
    function(element) {

        observer.observe(
            element
        );

    }
);
