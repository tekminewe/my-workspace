#!/bin/bash

# GitHub Project Board Automation Script
# Creates acquisition strategy project board with all issues and proper organization

set -e  # Exit on any error

echo "🚀 Setting up Acquisition Strategy Project Board..."
echo "=================================================="

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Check if gh CLI is authenticated
echo -e "${BLUE}Checking GitHub CLI authentication...${NC}"
if ! gh auth status > /dev/null 2>&1; then
    echo -e "${RED}❌ GitHub CLI not authenticated. Please run: gh auth login${NC}"
    exit 1
fi
echo -e "${GREEN}✅ GitHub CLI authenticated${NC}"

# Repository details
REPO="tekminewe/my-workspace"
PROJECT_TITLE="Acquisition Strategy & Feature Development"
PROJECT_DESCRIPTION="Social media integration, user acquisition features, and product development tracking"

echo -e "${BLUE}Creating project board...${NC}"

# Create the project (using beta command for Projects v2)
PROJECT_URL=$(gh project create \
    --title "$PROJECT_TITLE" \
    --body "$PROJECT_DESCRIPTION" \
    --owner tekminewe \
    --format json | jq -r '.url')

if [ -z "$PROJECT_URL" ]; then
    echo -e "${RED}❌ Failed to create project${NC}"
    exit 1
fi

echo -e "${GREEN}✅ Project created: $PROJECT_URL${NC}"

# Extract project number from URL
PROJECT_NUMBER=$(echo "$PROJECT_URL" | grep -o '[0-9]*$')
echo -e "${BLUE}Project Number: $PROJECT_NUMBER${NC}"

# Wait a moment for project to be fully created
sleep 2

echo -e "${BLUE}Adding existing issues to project...${NC}"

# List of existing issues to add to the project
ISSUES=(
    "2"   # Welcome Bonus System
    "3"   # Social Login Integration
    "4"   # Basic Referral Program
    "5"   # Deal Sharing Templates
    "6"   # Email Notification System
    "7"   # Instagram/Facebook Shopping Integration
    "8"   # Viral Content Templates & Generator
    "9"   # Enhanced Authentication & Security
    "10"  # Phase 1 Milestone Tracking
    "11"  # Analytics & Tracking Infrastructure
)

# Add each issue to the project
for issue in "${ISSUES[@]}"; do
    echo -e "${YELLOW}Adding issue #$issue to project...${NC}"
    
    # Add issue to project
    gh project item-add $PROJECT_NUMBER \
        --owner tekminewe \
        --url "https://github.com/$REPO/issues/$issue" || {
        echo -e "${RED}⚠️  Failed to add issue #$issue (might not exist yet)${NC}"
    }
    
    sleep 1  # Rate limiting prevention
done

echo -e "${BLUE}Setting up custom fields...${NC}"

# Create custom fields for better organization
echo -e "${YELLOW}Creating Priority field...${NC}"
gh project field-create $PROJECT_NUMBER \
    --owner tekminewe \
    --name "Priority" \
    --single-select-options "🔥 Critical,⭐ High,📅 Medium,📋 Low" || {
    echo -e "${RED}⚠️  Priority field might already exist${NC}"
}

echo -e "${YELLOW}Creating Phase field...${NC}"
gh project field-create $PROJECT_NUMBER \
    --owner tekminewe \
    --name "Phase" \
    --single-select-options "1️⃣ Phase 1,2️⃣ Phase 2,3️⃣ Phase 3,4️⃣ Phase 4" || {
    echo -e "${RED}⚠️  Phase field might already exist${NC}"
}

echo -e "${YELLOW}Creating Platform field...${NC}"
gh project field-create $PROJECT_NUMBER \
    --owner tekminewe \
    --name "Platform" \
    --single-select-options "🌐 Web,📱 Mobile,⚙️ API,🎨 UI,📊 Analytics" || {
    echo -e "${RED}⚠️  Platform field might already exist${NC}"
}

echo -e "${YELLOW}Creating Effort field...${NC}"
gh project field-create $PROJECT_NUMBER \
    --owner tekminewe \
    --name "Effort" \
    --single-select-options "🟢 Small,🟡 Medium,🔴 Large" || {
    echo -e "${RED}⚠️  Effort field might already exist${NC}"
}

echo -e "${BLUE}Creating additional views...${NC}"

# Create Table view
echo -e "${YELLOW}Creating Table view...${NC}"
gh project view-create $PROJECT_NUMBER \
    --owner tekminewe \
    --name "📊 Table View" \
    --layout table || {
    echo -e "${RED}⚠️  Table view might already exist${NC}"
}

# Create Timeline view  
echo -e "${YELLOW}Creating Timeline view...${NC}"
gh project view-create $PROJECT_NUMBER \
    --owner tekminewe \
    --name "📅 Timeline View" \
    --layout roadmap || {
    echo -e "${RED}⚠️  Timeline view might already exist${NC}"
}

echo -e "${GREEN}=================================================="
echo -e "🎉 PROJECT BOARD SETUP COMPLETE!"
echo -e "=================================================="
echo -e "${GREEN}✅ Project Created: $PROJECT_TITLE${NC}"
echo -e "${GREEN}✅ Project URL: $PROJECT_URL${NC}"
echo -e "${GREEN}✅ Issues Added: ${#ISSUES[@]} issues${NC}"
echo -e "${GREEN}✅ Custom Fields: Priority, Phase, Platform, Effort${NC}"
echo -e "${GREEN}✅ Views: Board, Table, Timeline${NC}"
echo ""
echo -e "${BLUE}🎯 Next Steps:${NC}"
echo -e "1. Visit your project: $PROJECT_URL"
echo -e "2. Organize issues into appropriate columns"
echo -e "3. Set field values (Priority, Phase, Platform, Effort)"
echo -e "4. Start your first sprint with Phase 1 issues!"
echo ""
echo -e "${YELLOW}📋 Phase 1 Issues Ready:${NC}"
echo -e "   • #2: Welcome Bonus System"
echo -e "   • #3: Social Login Integration"
echo -e "   • #4: Basic Referral Program"
echo -e "   • #5: Deal Sharing Templates"
echo -e "   • #6: Email Notification System"
echo -e "   • #9: Enhanced Authentication"
echo -e "   • #10: Phase 1 Milestone"
echo -e "   • #11: Analytics Infrastructure"
echo ""
echo -e "${GREEN}🚀 Ready to build your acquisition strategy!${NC}"
