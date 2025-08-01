import sys
import json
from sentence_transformers import SentenceTransformer, util
import nltk
from nltk.corpus import stopwords
from nltk import pos_tag
import string

nltk.data.path.append('C:\\Users\\Dell\\AppData\\Roaming\\nltk_data')

nltk.download('punkt')
nltk.download('punkt_tab')
nltk.download('stopwords')
nltk.download('averaged_perceptron_tagger')
nltk.download('averaged_perceptron_tagger_eng')

resume = sys.argv[1]
job_description = sys.argv[2]

# Load the model
model = SentenceTransformer('sentence-transformers/all-MiniLM-L6-v2')

resume_emb = model.encode(resume, convert_to_tensor=True)
jd_emb = model.encode(job_description, convert_to_tensor=True)

# Calculate cosine similarity between embeddings
cos_sim = util.cos_sim(resume_emb, jd_emb).item()

def extract_keywords(text):
    # Tokenize the text
    words = nltk.word_tokenize(text)
    
    stop_words = set(stopwords.words('english'))
    custom_stopwords = {
    'full', 'eg', 'new', 'like', 'job', 'stack', 'using', 'built',
    'team', 'teams', 'work', 'working', 'use', 'users', 'user',
    'system', 'systems', 'project', 'projects', 'application',
    'applications', 'platform', 'platforms', 'abilities', 'candidate', 'collaborate', 'communication', 'computer','ensure', 'experienced', 'familiarity', 'field', 'future',
    'hands-on', 'high-performance', 'ideal', 'implement', 'improvements',
    'maintain', 'maintainable', 'managers', 'mern', 'methodologies',
    'monitor', 'necessary', 'others', 'performance', 'preferred', 'product',
    'professional', 'proficiency', 'qualifications', 'requirements',
    'responsibilities', 'scalable', 'science', 'security', 'server', 'side',
    'services', 'standards', 'teamwork', 'title', 'troubleshoot',
    'understanding', 'upgrades', 'version', 'well-documented', 'write',
    'years', 'degree', 'description', 'designers',

    # Additional words
    'ability', 'access', 'achieve', 'addition', 'advanced', 'analysis',
    'analyze', 'approach', 'area', 'aspect', 'assist', 'assistance',
    'available', 'basic', 'benefit', 'best', 'better', 'business',
    'capability', 'challenge', 'change', 'client', 'clients', 'collaboration',
    'company', 'competence', 'complex', 'compliance', 'component', 'concept',
    'condition', 'configuration', 'connection', 'consideration', 'contribute',
    'contribution', 'core', 'create', 'creation', 'creative', 'critical',
    'data', 'deliver', 'delivery', 'demand', 'develop', 'development',
    'device', 'difficult', 'direct', 'direction', 'domain', 'drive',
    'effective', 'efficiency', 'efficient', 'effort', 'enhance', 'environment',
    'equipment', 'evaluation', 'example', 'execute', 'execution', 'exist',
    'expectation', 'experience', 'expert', 'expertise', 'factor', 'feature',
    'feedback', 'flexibility', 'focus', 'function', 'functional', 'goal',
    'guidance', 'guideline', 'help', 'helpful', 'highly', 'impact', 'implement',
    'improve', 'improvement', 'include', 'including', 'increase', 'individual',
    'industry', 'information', 'innovation', 'innovative', 'insight',
    'integration', 'interest', 'interface', 'internal', 'involve', 'issue',
    'knowledge', 'language', 'lead', 'leader', 'leadership', 'learn',
    'learning', 'level', 'leveraging', 'management', 'manager', 'method',
    'methodology', 'mindset', 'model', 'modular', 'motivate', 'need', 'network',
    'next', 'objective', 'operation', 'opportunity', 'optimize', 'option',
    'organization', 'overall', 'participate', 'participation', 'partner',
    'partnership', 'person', 'personal', 'perspective', 'plan', 'planning',
    'position', 'positive', 'potential', 'practice', 'problem', 'process',
    'product', 'production', 'profile', 'progress', 'provide', 'quality',
    'range', 'relationship', 'relevant', 'reliability', 'require',
    'requirement', 'resource', 'response', 'responsibility', 'result',
    'role', 'scalability', 'scope', 'section', 'selection', 'service',
    'skill', 'solution', 'solve', 'strategy', 'streamline', 'structure',
    'success', 'successful', 'support', 'task', 'technical', 'template',
    'term', 'test', 'testing', 'time', 'tool', 'training', 'transformation',
    'trend', 'understanding', 'unit', 'usage', 'value', 'variety', 'vision',
    'way', 'workflow', 'world', 'year'
}
    stop_words.update(custom_stopwords)
    
    tagged_words = pos_tag(words)
    
    # Filter keywords:
    # - Exclude stopwords and punctuation
    # - Include only nouns and adjectives
    # - Minimum length of 3 characters to avoid short words
    keywords = [
        w.lower() for w, pos in tagged_words
        if w.lower() not in stop_words
        and w not in string.punctuation
        and len(w) >= 3
        and pos in ('NN', 'NNS', 'NNP', 'NNPS', 'JJ')
    ]
    
    return set(keywords)

# Extract keywords from resume and job description
resume_keywords = extract_keywords(resume)
jd_keywords = extract_keywords(job_description)

# Find matched and missing keywords
matched = sorted(list(resume_keywords & jd_keywords))  
missing = sorted(list(jd_keywords - resume_keywords)) 

result = {
    "matchScore": round(cos_sim * 100, 2), 
    "keywords": {
        "matched": matched, 
        "missing": missing   
    }
}

print(json.dumps(result))