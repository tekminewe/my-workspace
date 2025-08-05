#!/bin/bash

# Repository Security Setup Script
# This script helps verify and document the security configuration status

set -e

echo "=========================================="
echo "Repository Security Configuration Check"
echo "=========================================="

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Check if we're in a git repository
if ! git rev-parse --git-dir > /dev/null 2>&1; then
    echo -e "${RED}❌ Error: Not in a git repository${NC}"
    exit 1
fi

echo -e "${BLUE}📋 Checking security configuration files...${NC}"

# Check for security configuration files
check_file() {
    local file=$1
    local description=$2
    
    if [ -f "$file" ]; then
        echo -e "${GREEN}✅ ${description}: ${file}${NC}"
        return 0
    else
        echo -e "${RED}❌ ${description}: ${file} (missing)${NC}"
        return 1
    fi
}

# Security configuration files
echo ""
echo -e "${YELLOW}Security Configuration Files:${NC}"
check_file "SECURITY.md" "Security policy"
check_file ".github/dependabot.yml" "Dependabot configuration"
check_file ".github/codeql/codeql-config.yml" "CodeQL configuration"
check_file ".github/SECURITY_SETUP.md" "Security setup guide"
check_file ".github/workflows/security-audit.yml" "Security audit workflow"

echo ""
echo -e "${YELLOW}CI/CD Security Integration:${NC}"
check_file ".github/workflows/ci.yml" "Main CI pipeline"
check_file ".github/workflows/pr-checks.yml" "PR security checks"

echo ""
echo -e "${BLUE}📊 Checking repository settings...${NC}"

# Check git configuration
echo ""
echo -e "${YELLOW}Git Configuration:${NC}"
if git config --get user.signingkey > /dev/null 2>&1; then
    echo -e "${GREEN}✅ GPG signing key configured${NC}"
else
    echo -e "${YELLOW}⚠️  GPG signing key not configured (recommended)${NC}"
fi

# Check for GitHub CLI and repository settings
echo ""
echo -e "${YELLOW}GitHub Repository Settings:${NC}"

if command -v gh &> /dev/null; then
    echo -e "${GREEN}✅ GitHub CLI available${NC}"
    
    # Check if authenticated
    if gh auth status > /dev/null 2>&1; then
        echo -e "${GREEN}✅ GitHub CLI authenticated${NC}"
        
        # Get repository info
        REPO_INFO=$(gh repo view --json name,owner,visibility,hasIssuesEnabled,hasWikiEnabled)
        REPO_NAME=$(echo "$REPO_INFO" | jq -r '.name')
        REPO_OWNER=$(echo "$REPO_INFO" | jq -r '.owner.login')
        REPO_VISIBILITY=$(echo "$REPO_INFO" | jq -r '.visibility')
        
        echo -e "${BLUE}Repository: ${REPO_OWNER}/${REPO_NAME} (${REPO_VISIBILITY})${NC}"
        
        # Check security features (this would require GitHub API calls)
        echo -e "${YELLOW}⚠️  Manual verification required for:${NC}"
        echo "   - Dependabot alerts"
        echo "   - Secret scanning"
        echo "   - CodeQL analysis"
        echo "   - Branch protection rules"
        echo "   - Private vulnerability reporting"
        
    else
        echo -e "${YELLOW}⚠️  GitHub CLI not authenticated${NC}"
        echo "   Run: gh auth login"
    fi
else
    echo -e "${YELLOW}⚠️  GitHub CLI not installed${NC}"
    echo "   Install from: https://cli.github.com/"
fi

echo ""
echo -e "${BLUE}🔐 Security Checklist:${NC}"
echo ""
echo "Manual steps required in GitHub repository settings:"
echo ""
echo "1. Security & Analysis Settings:"
echo "   □ Enable Dependabot alerts"
echo "   □ Enable Dependabot security updates"
echo "   □ Enable secret scanning"
echo "   □ Enable push protection"
echo "   □ Enable CodeQL analysis"
echo "   □ Enable private vulnerability reporting"
echo ""
echo "2. Branch Protection Rules:"
echo "   □ Protect main branch"
echo "   □ Require pull request reviews"
echo "   □ Require status checks"
echo "   □ Require up-to-date branches"
echo "   □ Require conversation resolution"
echo ""
echo "3. General Settings:"
echo "   □ Configure notifications"
echo "   □ Set up security contacts"
echo "   □ Review access permissions"
echo ""

echo -e "${GREEN}✅ Security configuration files are ready!${NC}"
echo -e "${BLUE}📖 See .github/SECURITY_SETUP.md for detailed setup instructions${NC}"

echo ""
echo "=========================================="
echo "Security Configuration Check Complete"
echo "=========================================="
