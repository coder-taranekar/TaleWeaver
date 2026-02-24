// Tale Weaver - Enhanced AI Storytelling with Real OpenRouter Integration

// Application Configuration
const APP_CONFIG = {
    openRouterApiUrl: 'https://openrouter.ai/api/v1/chat/completions',
    siteName: 'Tale Weaver',
    siteUrl: 'https://tale-weaver.app',
    defaultModel: 'openai/gpt-4o-mini',
    defaultTemperature: 0.8,
    defaultMaxTokens: 250
};

// Available Models Data
const AVAILABLE_MODELS = [
    {"id": "openai/gpt-4o-mini", "name": "GPT-4o Mini", "provider": "OpenAI"},
    {"id": "openai/gpt-3.5-turbo", "name": "GPT-3.5 Turbo", "provider": "OpenAI"},
    {"id": "anthropic/claude-3.5-sonnet", "name": "Claude 3.5 Sonnet", "provider": "Anthropic"},
    {"id": "anthropic/claude-3-haiku", "name": "Claude 3 Haiku", "provider": "Anthropic"},
    {"id": "meta-llama/llama-3.1-8b-instruct", "name": "Llama 3.1 8B", "provider": "Meta"},
    {"id": "mistralai/mistral-7b-instruct", "name": "Mistral 7B", "provider": "Mistral AI"}
];

// Enhanced System Prompts for Different Genres - ALL END WITH QUESTIONS
const SYSTEM_PROMPTS = {
    "ceo": "Aap ek experienced business storyteller hain jo CEO ki challenging journey ke baare mein engaging stories likhte hain. User ek startup CEO ka role play kar raha hai. Aapko Hinglish mein natural conversation karna hai. Story ko realistic banao with business challenges. IMPORTANT: Har response ka end ek engaging question ke saath hona chahiye jo user ko decision lene par force kare. Questions should be specific, contextual, aur story ko aage badhane wale hone chahiye. Examples: 'Aap investors ko kya kehkar convince karoge?', 'Team morale down hai - aapka approach kya hoga?', 'Competition se kaise deal karoge?'. Keep responses 100-150 words aur hamesha question pe khatam karo.",
    "detective": "Aap ek mystery storyteller hain jo detective cases create karte hain. User ek Mumbai police inspector ka role play kar raha hai. Hinglish mein natural conversation maintain karo with realistic crime details. CRITICAL: Har response ko ek investigative question ke saath end karna hai jo case solve karne mein madad kare. Questions should advance the mystery: 'Aap pehle kise interrogate karoge?', 'Is clue ka kya matlab ho sakta hai?', 'Suspect ka alibi check kaise karoge?'. Include evidence, suspects, motives in your questions. 100-150 words per response, always end with a compelling question.",
    "college-diaries": "Aap ek college life storyteller hain jo engineering students ki journey capture karte hain. User ek engineering student ka role play kar raha hai jo college mein romance, academics, aur social life balance kar raha hai. Hinglish mein relatable aur emotional stories banao. ESSENTIAL: Har response ka end ek personal choice question ke saath hona chahiye. Questions should reflect college dilemmas: 'Aap crush ko approach karoge ya studies par focus karoge?', 'Friends ke saath party jaana hai ya assignment complete karna hai?', 'Placement ke liye kya strategy banoge?'. Keep it authentic with hostel life, college culture. 100-150 words, always end with a life choice question.",
    "rich-to-poor": "Aap ek social experiment storyteller hain. User ek wealthy person ka role play kar raha hai jo deliberately poor lifestyle experience kar raha hai. Hinglish mein realistic social situations create karo with class differences. MANDATORY: Har response ko survival aur adaptation question ke saath end karna hai. Questions should challenge user's adaptability: 'Paisa khatam ho raha hai - aapka next plan kya hai?', 'Social status change se kaise deal karoge?', 'Is situation se kya seekhoge?'. Include money struggles, social interactions, personal growth. 100-150 words, compulsory question ending."
};

// Conversation Starters
const CONVERSATION_STARTERS = {
    "ceo": "Namaste! Aap ab TechStart Solutions ke CEO hain. 2 saal pehle aapne ye company 3 friends ke saath start ki thi. Aj market mein tough competition hai, funding difficult hai, aur 50 employees ka responsibility aap pe hai. Board meeting mein investors pressure kar rahe hain results ke liye. Aapka head of engineering kehta hai ki new product 6 mahine aur lagega, but sales team kehti hai clients abhi results chahiye. Aap kya decision loge - product quality pe focus karna, quick market entry lena, ya koi hybrid approach try karna?",
    "detective": "Inspector sahab, Mumbai Central Police Station mein aapka assignment start ho gaya hai. Bandra mein ek high-profile businessman Mr. Rajesh Khanna (45 years) ka murder hua hai. Crime scene par body office cabin mein mili hai, door andar se locked tha. Preliminary investigation mein poison ka use detected hua hai. 3 main suspects hain - business partner (money dispute), ex-wife (alimony issues), aur personal secretary (recent firing threat). Crime scene fresh hai, evidence collect karne ka time limited hai. Aap sabse pehle kya investigate karoge - crime scene detail mein check karna, suspects ko interrogate karna, ya victim ke recent activities trace karna?",
    "college-diaries": "Final year engineering mein hain aap, placement season start hone wala hai. Campus ki cute classmate Priya mein interest hai, similar field hai, yesterday canteen mein great conversation hui. But kal Goldman Sachs ka pre-placement talk hai aur preparation pending hai. Roommate Rohit kehta hai 'career first, love later'. Friends mixed advice de rahe hain. Hostel mein sab coding practice kar rahe hain, lekin aapka mann Priya ke saath time spend karne mein lag raha hai. Aap kya decision loge - studies par pura focus karna, Priya ko propose kar dena, ya dono ke beech balance maintain karna?",
    "rich-to-poor": "Challenge accepted! Aapke wealthy businessman papa ne bet lagaya hai - 30 din common man ki life jiyo sirf 5000 rupees ke saath. No credit cards, family connections, luxury items. Success hone par papa ka 10 crore project aapke naam. Mumbai Andheri station ke paas khade hain, morning 9 baje, 5000 cash pocket mein. First day plan karna hai - room dhundna, kaam start karna, survival strategy banani hai. Local logo ka behavior different hoga, social status suddenly change ho gaya. Aap pehle kya karoge - cheap accommodation dhundna, immediate job opportunity search karna, ya area explore karke local connections banane ki koshish karna?"
};

// Application State
let appState = {
    apiKey: null,
    selectedModel: APP_CONFIG.defaultModel,
    temperature: APP_CONFIG.defaultTemperature,
    maxTokens: APP_CONFIG.defaultMaxTokens,
    currentStory: null,
    conversationHistory: [],
    isGenerating: false,
    currentController: null,
    isCustomInputMode: false
};

// DOM Elements Cache
let elements = {};

// Initialize Application
document.addEventListener('DOMContentLoaded', function() {
    try {
        cacheElements();
        initializeApp();
        setupEventListeners();
        console.log('Tale Weaver with OpenRouter AI initialized successfully!');
    } catch (error) {
        console.error('Error initializing app:', error);
    }
});

// Cache DOM Elements
function cacheElements() {
    elements = {
        homepage: document.getElementById('homepage'),
        storyInterface: document.getElementById('storyInterface'),
        settingsModal: document.getElementById('settingsModal'),
        configBanner: document.getElementById('configBanner'),
        connectionStatus: document.getElementById('connectionStatus'),
        storyTitle: document.getElementById('storyTitle'),
        modelIndicator: document.getElementById('modelIndicator'),
        chatMessages: document.getElementById('chatMessages'),
        choicesContainer: document.getElementById('choicesContainer'),
        textInput: document.getElementById('textInput'),
        customResponse: document.getElementById('customResponse'),
        toggleInput: document.getElementById('toggleInput'),
        toggleText: document.getElementById('toggleText'),
        loadingIndicator: document.getElementById('loadingIndicator'),
        loadingMessage: document.getElementById('loadingMessage'),
        cancelBtn: document.getElementById('cancelBtn'),
        sendBtn: document.getElementById('sendBtn'),
        streamingMessage: document.getElementById('streamingMessage'),
        streamingText: document.getElementById('streamingText'),
        homeBtn: document.querySelector('.home-btn'),
        apiKey: document.getElementById('apiKey'),
        modelSelect: document.getElementById('modelSelect'),
        temperature: document.getElementById('temperature'),
        maxTokens: document.getElementById('maxTokens')
    };
}

// Initialize Application
function initializeApp() {
    initializeGenreCards();
    populateModelDropdown();
    updateConnectionStatus();
    showConfigBannerIfNeeded();
}

// Setup Event Listeners
function setupEventListeners() {
    // Enter key handling for custom response
    if (elements.customResponse) {
        elements.customResponse.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                sendCustomResponse();
            }
        });
    }

    // Model selection change
    if (elements.modelSelect) {
        elements.modelSelect.addEventListener('change', function() {
            appState.selectedModel = this.value;
            updateModelIndicator();
        });
    }

    // Temperature and max tokens changes
    if (elements.temperature) {
        elements.temperature.addEventListener('change', function() {
            appState.temperature = parseFloat(this.value);
        });
    }

    if (elements.maxTokens) {
        elements.maxTokens.addEventListener('change', function() {
            appState.maxTokens = parseInt(this.value);
        });
    }
}

// Initialize Genre Cards
function initializeGenreCards() {
    const genreCards = document.querySelectorAll('.genre-card');
    
    genreCards.forEach(card => {
        card.addEventListener('click', function() {
            const genre = this.dataset.genre;
            if (isApiConfigured()) {
                startStory(genre);
            } else {
                alert('Please configure your API settings first');
                openSettings();
            }
        });
    });
}

// Populate Model Dropdown
function populateModelDropdown() {
    if (!elements.modelSelect) return;
    
    const select = elements.modelSelect;
    select.innerHTML = '<option value="">Select a model...</option>';
    
    AVAILABLE_MODELS.forEach(model => {
        const option = document.createElement('option');
        option.value = model.id;
        option.textContent = `${model.name} (${model.provider})`;
        if (model.id === appState.selectedModel) {
            option.selected = true;
        }
        select.appendChild(option);
    });
}

// API Configuration Functions
function isApiConfigured() {
    return appState.apiKey && appState.selectedModel;
}

function updateConnectionStatus() {
    if (!elements.connectionStatus) return;
    
    const statusDot = elements.connectionStatus.querySelector('.status-dot');
    const statusText = elements.connectionStatus.querySelector('.status-text');
    
    if (statusDot && statusText) {
        if (isApiConfigured()) {
            statusDot.className = 'status-dot status-dot--connected';
            statusText.textContent = 'Connected';
            if (elements.configBanner) {
                elements.configBanner.classList.add('hidden');
            }
        } else {
            statusDot.className = 'status-dot status-dot--disconnected';
            statusText.textContent = 'Not Configured';
            if (elements.configBanner) {
                elements.configBanner.classList.remove('hidden');
            }
        }
    }
}

function showConfigBannerIfNeeded() {
    if (!elements.configBanner) return;
    
    if (!isApiConfigured()) {
        elements.configBanner.classList.remove('hidden');
    } else {
        elements.configBanner.classList.add('hidden');
    }
}

function updateModelIndicator() {
    if (!elements.modelIndicator) return;
    
    const model = AVAILABLE_MODELS.find(m => m.id === appState.selectedModel);
    const modelNameElement = elements.modelIndicator.querySelector('.model-name');
    
    if (model && modelNameElement) {
        modelNameElement.textContent = model.name;
    }
}

// Settings Modal Functions - Make them globally accessible
window.openSettings = function() {
    console.log('Opening settings modal');
    
    if (!elements.settingsModal) {
        console.error('Settings modal not found');
        return;
    }
    
    // Pre-fill current settings
    if (elements.apiKey) elements.apiKey.value = appState.apiKey || '';
    if (elements.modelSelect) elements.modelSelect.value = appState.selectedModel;
    if (elements.temperature) elements.temperature.value = appState.temperature;
    if (elements.maxTokens) elements.maxTokens.value = appState.maxTokens;
    
    elements.settingsModal.classList.remove('hidden');
};

window.closeSettings = function() {
    console.log('Closing settings modal');
    
    if (elements.settingsModal) {
        elements.settingsModal.classList.add('hidden');
    }
};

window.saveSettings = function() {
    console.log('Saving settings');
    
    if (!elements.apiKey || !elements.modelSelect) {
        alert('Settings form elements not found');
        return;
    }
    
    const apiKey = elements.apiKey.value.trim();
    const selectedModel = elements.modelSelect.value;
    const temperature = parseFloat(elements.temperature.value || APP_CONFIG.defaultTemperature);
    const maxTokens = parseInt(elements.maxTokens.value || APP_CONFIG.defaultMaxTokens);
    
    if (!apiKey) {
        alert('Please enter your OpenRouter API key');
        return;
    }
    
    if (!selectedModel) {
        alert('Please select an AI model');
        return;
    }
    
    // Update app state
    appState.apiKey = apiKey;
    appState.selectedModel = selectedModel;
    appState.temperature = temperature;
    appState.maxTokens = maxTokens;
    
    // Update UI
    updateConnectionStatus();
    updateModelIndicator();
    closeSettings();
    
    alert('Settings saved successfully! You can now start creating stories.');
};

// Story Management Functions
function startStory(genreId) {
    if (!isApiConfigured()) {
        alert('Please configure your API settings first');
        openSettings();
        return;
    }
    
    appState.currentStory = genreId;
    appState.conversationHistory = [];
    
    // Updated story titles with College Diaries
    const storyTitles = {
        'ceo': 'CEO Experience',
        'detective': 'Detective Mystery',
        'college-diaries': 'College Diaries',
        'rich-to-poor': 'Rich to Poor'
    };
    
    // Update UI
    if (elements.storyTitle) elements.storyTitle.textContent = storyTitles[genreId];
    updateModelIndicator();
    
    // Hide homepage, show story interface
    if (elements.homepage) elements.homepage.classList.add('hidden');
    if (elements.storyInterface) elements.storyInterface.classList.remove('hidden');
    if (elements.homeBtn) elements.homeBtn.classList.remove('hidden');
    
    // Clear previous messages
    if (elements.chatMessages) elements.chatMessages.innerHTML = '';
    
    // Add initial story message
    const initialMessage = CONVERSATION_STARTERS[genreId];
    addMessage(initialMessage, 'ai');
    
    // Generate initial choices
    generateChoices(initialMessage);
    
    // Reset input mode
    resetInputMode();
}

window.restartStory = function() {
    if (!appState.currentStory) return;
    
    if (confirm('Are you sure you want to restart the story? All progress will be lost.')) {
        startStory(appState.currentStory);
    }
};

window.goHome = function() {
    // Cancel any ongoing generation
    if (appState.currentController) {
        appState.currentController.abort();
        appState.currentController = null;
    }
    
    // Hide story interface, show homepage
    if (elements.storyInterface) elements.storyInterface.classList.add('hidden');
    if (elements.homepage) elements.homepage.classList.remove('hidden');
    if (elements.homeBtn) elements.homeBtn.classList.add('hidden');
    
    // Reset state
    appState.currentStory = null;
    appState.conversationHistory = [];
    appState.isGenerating = false;
    resetInputMode();
    
    // Clear messages
    if (elements.chatMessages) elements.chatMessages.innerHTML = '';
    if (elements.choicesContainer) elements.choicesContainer.classList.add('hidden');
    hideLoading();
};

window.exportStory = function() {
    if (appState.conversationHistory.length === 0) {
        alert('No story to export yet!');
        return;
    }
    
    let storyText = `Tale Weaver Story - ${elements.storyTitle ? elements.storyTitle.textContent : 'Unknown'}\n`;
    storyText += `Model: ${appState.selectedModel}\n`;
    storyText += `Generated on: ${new Date().toLocaleString()}\n\n`;
    
    appState.conversationHistory.forEach(message => {
        const sender = message.sender === 'ai' ? 'AI' : 'You';
        storyText += `${sender}: ${message.text}\n\n`;
    });
    
    const blob = new Blob([storyText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `tale-weaver-story-${Date.now()}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
};

// Message Management
function addMessage(text, sender) {
    if (!elements.chatMessages) return;
    
    const messageDiv = document.createElement('div');
    messageDiv.className = `message message--${sender}`;
    
    const bubbleDiv = document.createElement('div');
    bubbleDiv.className = 'message__bubble';
    bubbleDiv.textContent = text;
    
    messageDiv.appendChild(bubbleDiv);
    elements.chatMessages.appendChild(messageDiv);
    
    // Scroll to bottom
    elements.chatMessages.scrollTop = elements.chatMessages.scrollHeight;
    
    // Add to conversation history
    appState.conversationHistory.push({
        text: text,
        sender: sender,
        timestamp: Date.now()
    });
}

// Choice Management
function showChoices(choices) {
    if (!elements.choicesContainer) return;
    
    elements.choicesContainer.innerHTML = '';
    
    if (choices && choices.length > 0) {
        choices.forEach((choice, index) => {
            const button = document.createElement('button');
            button.className = 'choice-btn';
            button.textContent = choice;
            button.addEventListener('click', () => selectChoice(choice));
            elements.choicesContainer.appendChild(button);
        });
        
        elements.choicesContainer.classList.remove('hidden');
    } else {
        elements.choicesContainer.classList.add('hidden');
    }
}

function selectChoice(choice) {
    if (appState.isGenerating) return;
    
    // Add user's choice as message
    addMessage(choice, 'user');
    
    // Hide choices
    if (elements.choicesContainer) elements.choicesContainer.classList.add('hidden');
    
    // Generate AI response
    generateAIResponse(choice);
}

async function generateChoices(lastMessage) {
    try {
        const choicePrompt = `Based on this story context, generate exactly 3 short choice options (each under 10 words) that the user can select to continue the story. Return only the choices separated by newlines, no numbering or extra text: "${lastMessage.slice(-200)}"`;
        
        const response = await callOpenRouterAPI([
            { role: 'system', content: 'Generate exactly 3 brief story choices, each under 10 words. Return only the choices, one per line.' },
            { role: 'user', content: choicePrompt }
        ], false);
        
        if (response) {
            const choices = response.split('\n').filter(choice => choice.trim()).slice(0, 3);
            if (choices.length > 0) {
                showChoices(choices);
            }
        }
    } catch (error) {
        console.error('Error generating choices:', error);
        // Show fallback choices
        showFallbackChoices();
    }
}

function showFallbackChoices() {
    const fallbackChoices = [
        "Continue with current plan",
        "Try a different approach",
        "Ask for help or advice"
    ];
    showChoices(fallbackChoices);
}

// Input Mode Management
window.toggleInputMode = function() {
    appState.isCustomInputMode = !appState.isCustomInputMode;
    
    if (appState.isCustomInputMode) {
        if (elements.textInput) elements.textInput.classList.remove('hidden');
        if (elements.toggleText) elements.toggleText.textContent = 'Use Quick Choices';
        if (elements.customResponse) elements.customResponse.focus();
    } else {
        if (elements.textInput) elements.textInput.classList.add('hidden');
        if (elements.toggleText) elements.toggleText.textContent = 'Write Custom Response';
        if (elements.customResponse) elements.customResponse.value = '';
    }
};

window.sendCustomResponse = function() {
    if (!elements.customResponse) return;
    
    const response = elements.customResponse.value.trim();
    
    if (!response) {
        alert('Please write your response first!');
        return;
    }
    
    if (appState.isGenerating) {
        alert('Please wait for the current response to complete');
        return;
    }
    
    // Add user's custom response
    addMessage(response, 'user');
    
    // Clear input
    elements.customResponse.value = '';
    
    // Hide choices and input
    if (elements.choicesContainer) elements.choicesContainer.classList.add('hidden');
    if (elements.textInput) elements.textInput.classList.add('hidden');
    appState.isCustomInputMode = false;
    if (elements.toggleText) elements.toggleText.textContent = 'Write Custom Response';
    
    // Generate AI response
    generateAIResponse(response);
};

function resetInputMode() {
    appState.isCustomInputMode = false;
    if (elements.textInput) elements.textInput.classList.add('hidden');
    if (elements.toggleText) elements.toggleText.textContent = 'Write Custom Response';
    if (elements.customResponse) elements.customResponse.value = '';
}

// AI Response Generation
async function generateAIResponse(userInput) {
    if (appState.isGenerating) return;
    
    appState.isGenerating = true;
    showLoading();
    disableInteractions();
    
    try {
        const messages = buildConversationMessages(userInput);
        const response = await callOpenRouterAPI(messages, true);
        
        if (response) {
            // Generate follow-up choices
            await generateChoices(response);
        }
        
    } catch (error) {
        console.error('Error generating AI response:', error);
        addMessage('Sorry, there was an error generating the response. Please try again.', 'ai');
        showFallbackChoices();
    } finally {
        appState.isGenerating = false;
        hideLoading();
        enableInteractions();
    }
}

function buildConversationMessages(userInput) {
    const messages = [
        { role: 'system', content: SYSTEM_PROMPTS[appState.currentStory] }
    ];
    
    // Add conversation history (keep last 10 messages for context)
    const recentHistory = appState.conversationHistory.slice(-10);
    recentHistory.forEach(msg => {
        messages.push({
            role: msg.sender === 'ai' ? 'assistant' : 'user',
            content: msg.text
        });
    });
    
    // Add current user input
    messages.push({ role: 'user', content: userInput });
    
    return messages;
}

// OpenRouter API Integration
async function callOpenRouterAPI(messages, stream = true) {
    const controller = new AbortController();
    appState.currentController = controller;
    
    try {
        const response = await fetch(APP_CONFIG.openRouterApiUrl, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${appState.apiKey}`,
                'Content-Type': 'application/json',
                'HTTP-Referer': APP_CONFIG.siteUrl,
                'X-Title': APP_CONFIG.siteName
            },
            body: JSON.stringify({
                model: appState.selectedModel,
                messages: messages,
                temperature: appState.temperature,
                max_tokens: appState.maxTokens,
                stream: stream
            }),
            signal: controller.signal
        });
        
        if (!response.ok) {
            const error = await response.json();
            throw new Error(`API Error: ${error.error?.message || response.statusText}`);
        }
        
        if (stream) {
            return await handleStreamingResponse(response);
        } else {
            const data = await response.json();
            return data.choices[0].message.content;
        }
        
    } catch (error) {
        if (error.name === 'AbortError') {
            console.log('Request cancelled');
            return null;
        }
        throw error;
    } finally {
        appState.currentController = null;
    }
}

async function handleStreamingResponse(response) {
    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let fullResponse = '';
    
    // Show streaming message container
    if (elements.streamingMessage && elements.chatMessages) {
        elements.streamingMessage.classList.remove('hidden');
        elements.chatMessages.appendChild(elements.streamingMessage);
        if (elements.streamingText) elements.streamingText.textContent = '';
    }
    
    try {
        while (true) {
            const { done, value } = await reader.read();
            
            if (done) break;
            
            const chunk = decoder.decode(value);
            const lines = chunk.split('\n');
            
            for (const line of lines) {
                if (line.startsWith('data: ')) {
                    const jsonStr = line.slice(6).trim();
                    
                    if (jsonStr === '[DONE]') {
                        break;
                    }
                    
                    try {
                        const data = JSON.parse(jsonStr);
                        const content = data.choices?.[0]?.delta?.content;
                        
                        if (content) {
                            fullResponse += content;
                            if (elements.streamingText) {
                                elements.streamingText.textContent = fullResponse;
                            }
                            if (elements.chatMessages) {
                                elements.chatMessages.scrollTop = elements.chatMessages.scrollHeight;
                            }
                        }
                    } catch (e) {
                        // Skip invalid JSON lines
                        continue;
                    }
                }
            }
        }
        
        // Hide streaming container and add final message
        if (elements.streamingMessage) elements.streamingMessage.classList.add('hidden');
        
        if (fullResponse) {
            addMessage(fullResponse, 'ai');
        }
        
        return fullResponse;
        
    } catch (error) {
        if (elements.streamingMessage) elements.streamingMessage.classList.add('hidden');
        throw error;
    }
}

window.cancelGeneration = function() {
    if (appState.currentController) {
        appState.currentController.abort();
        appState.currentController = null;
        appState.isGenerating = false;
        hideLoading();
        enableInteractions();
        if (elements.streamingMessage) elements.streamingMessage.classList.add('hidden');
    }
};

// UI State Management
function showLoading() {
    if (elements.loadingIndicator) elements.loadingIndicator.classList.remove('hidden');
    if (elements.loadingMessage) elements.loadingMessage.textContent = 'AI soch raha hai...';
}

function hideLoading() {
    if (elements.loadingIndicator) elements.loadingIndicator.classList.add('hidden');
}

function disableInteractions() {
    if (elements.sendBtn) elements.sendBtn.disabled = true;
    if (elements.customResponse) elements.customResponse.disabled = true;
    
    // Disable choice buttons
    if (elements.choicesContainer) {
        const choiceButtons = elements.choicesContainer.querySelectorAll('.choice-btn');
        choiceButtons.forEach(btn => btn.disabled = true);
    }
}

function enableInteractions() {
    if (elements.sendBtn) elements.sendBtn.disabled = false;
    if (elements.customResponse) elements.customResponse.disabled = false;
    
    // Enable choice buttons
    if (elements.choicesContainer) {
        const choiceButtons = elements.choicesContainer.querySelectorAll('.choice-btn');
        choiceButtons.forEach(btn => btn.disabled = false);
    }
}

// Export for testing and debugging
window.TaleWeaver = {
    appState,
    startStory,
    goHome,
    restartStory,
    openSettings,
    closeSettings,
    saveSettings,
    toggleInputMode,
    sendCustomResponse,
    exportStory,
    isApiConfigured,
    AVAILABLE_MODELS,
    SYSTEM_PROMPTS,
    CONVERSATION_STARTERS
};

console.log('Tale Weaver with Enhanced Question-Driven AI Integration loaded successfully!');