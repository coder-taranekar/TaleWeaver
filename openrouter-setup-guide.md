# OpenRouter API Setup Guide for Tale Weaver

## Getting Your OpenRouter API Key

### Step 1: Create an OpenRouter Account
1. Visit [OpenRouter.ai](https://openrouter.ai)
2. Click "Sign in" in the top-right corner
3. Select "Sign up" to create your account
4. Complete the registration process

### Step 2: Generate Your API Key
1. Once logged in, navigate to the **API Keys** section
2. Click "Create Key" button
3. Give your key a descriptive name (e.g., "Tale Weaver App")
4. Optionally set a credit limit for usage control
5. Click "Create" to generate your key
6. **IMPORTANT**: Copy and save your API key immediately - you won't be able to view it again!

### Step 3: Configure Tale Weaver
1. Open the Tale Weaver application
2. Click the "⚙️ Settings" button in the header
3. Paste your OpenRouter API key in the "API Key" field
4. Select your preferred AI model from the dropdown
5. Adjust temperature and max tokens if needed
6. Click "Save Configuration"

## Recommended Models for Storytelling

### Best Performance (Higher Cost)
- **GPT-4o Mini**: Excellent for creative writing and Hinglish understanding
- **Claude 3.5 Sonnet**: Great for narrative consistency and character development

### Balanced Performance (Medium Cost)
- **GPT-3.5 Turbo**: Good general storytelling capabilities
- **Claude 3 Haiku**: Fast responses with decent quality

### Budget-Friendly (Lower Cost)
- **Llama 3.1 8B**: Open-source model with good Hinglish support
- **Mistral 7B**: Fast and efficient for story generation

## Configuration Tips

### Temperature Settings
- **0.3-0.5**: More focused and consistent storytelling
- **0.6-0.8**: Balanced creativity and coherence (recommended)
- **0.9-1.2**: More creative but potentially less coherent

### Max Tokens
- **150-200**: Short, punchy story segments
- **250-300**: Standard responses (recommended)
- **400-500**: Longer, more detailed narratives

## API Usage & Costs

OpenRouter charges based on token usage. Approximate costs:
- **Input tokens**: Text you send to the AI
- **Output tokens**: Text the AI generates for you

Most models charge between $0.50-$20 per million tokens. A typical Tale Weaver conversation uses 100-300 tokens per response.

## Security Best Practices

### API Key Security
- Never share your API key with others
- Don't commit API keys to public repositories
- Consider setting credit limits to control spending
- Monitor your usage regularly on OpenRouter dashboard

### Client-Side Storage Warning
Tale Weaver stores your API key in your browser's local storage for convenience. This means:
- ✅ Your key stays on your device
- ✅ No server-side storage of your credentials
- ⚠️ Clear browser data will remove your saved key
- ⚠️ Don't use on shared/public computers

## Troubleshooting

### Common Issues

**"API Key Invalid" Error**
- Double-check your API key is correct
- Ensure no extra spaces when copying/pasting
- Verify your OpenRouter account has credits

**"Model Not Available" Error**
- Try a different model from the dropdown
- Some models may have usage restrictions
- Check OpenRouter status page for model availability

**"Rate Limited" Error**
- You're making too many requests too quickly
- Wait a few seconds and try again
- Consider upgrading your OpenRouter plan

**Slow Responses**
- Some models are slower than others
- Try switching to GPT-3.5 Turbo or Claude Haiku for faster responses
- Check your internet connection

### Getting Help

1. **OpenRouter Documentation**: [openrouter.ai/docs](https://openrouter.ai/docs)
2. **OpenRouter Discord**: Join their community for support
3. **Tale Weaver Issues**: Check the connection status indicator in the app header

## Advanced Features

### Custom Story Prompts
The app uses specialized system prompts for each story genre to ensure authentic Hinglish storytelling and cultural context.

### Conversation History
Your story progress is automatically saved in your browser. You can continue where you left off or start fresh anytime.

### Model Switching
You can change AI models mid-conversation to experiment with different storytelling styles.

### Export Stories
Use the conversation history to copy and save your favorite story outcomes.

## Cost Management Tips

1. **Set Credit Limits**: Use OpenRouter's credit limit feature
2. **Monitor Usage**: Check your token usage in OpenRouter dashboard
3. **Choose Efficient Models**: Smaller models like Mistral 7B are more cost-effective
4. **Optimize Prompts**: Shorter, clearer prompts use fewer tokens

## Next Steps

1. Get your OpenRouter API key following steps above
2. Configure Tale Weaver with your key and preferred model
3. Start your first interactive story!
4. Experiment with different models and settings
5. Share your favorite story outcomes

Happy storytelling! 🎭✨