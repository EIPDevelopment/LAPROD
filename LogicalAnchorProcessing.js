// this is the processing step to delete logical anchors
function logicAnchorDeleteProcessingPrep(caseData) {

//this is a test comment 2
    
let clientIsFA = returnAttributeValue(caseData, 'CLIENT_IS_FA');
let basis = returnAttributeValue(caseData, 'BASIS');
let category = returnAttributeValue(caseData, 'CATEGORY');
let countryCode = returnAttributeValue(caseData, 'COUNTRY_CODE');
let epoasisa = returnAttributeValue(caseData, 'DATE_ISR_DRAWN_UP_BY_EPO');
let epoWasNotIsa = returnAttributeValue(caseData, 'DATE_ISR_DRAWN_UP_NOT_EPO');
let pctEnglishSpeaking = returnAttributeValue(caseData, 'PCT_ENGLISH_SPEAKING');
let monthlyBilling = returnAttributeValue(caseData, "MONTHLY_BILLING");
let form10FilingDate = returnAttributeValue(caseData, "FORM_10_FILING_DATE");
let form9aFilingDate = returnAttributeValue(caseData, "FORM_9A_FILING_DATE");
let filingDateUS = returnAttributeValue(caseData, 'APPLICATION_FILING_DATE');
let effectiveFilingDate2 = returnAttributeValue(caseData, 'NATIONAL_PHASE_ENTRY');
let parentFilingDateUS = returnAttributeValue(caseData, 'PARENT_FILING_DATE_US');
let inventorCount = returnAttributeValue(caseData, 'INVENTOR_COUNT');
let faNameCode = returnAttributeValue(caseData, 'AGENT_ACCOUNT_NO');
let renewalType = returnAttributeValue(caseData, 'RENEWAL_TYPE');
let applicationFilingDatePlus18MFUTUREorPAST = returnAttributeValue(caseData, 'APPLICATION_FILING_DATE_PLUS_18M_FUTURE_OR_PAST');
let priorityDatePlus18MFUTUREorPAST = returnAttributeValue(caseData, 'PRIORITY_DATE_PLUS_18M_FUTURE_OR_PAST');
let designatedCountries = returnAttributeValue(caseData, 'DESIGNATED_COUNTRIES');

let applicantNameCode = returnAttributeValue(caseData,'APPLICANT_NAME_CODE');
let instructorNameCode = returnAttributeValue(caseData, 'INSTRUCT_NAME_CODE');
let ownerNameCode = returnAttributeValue(caseData, 'OWNER_NAME_CODE');

let designationsGroup1 = returnAttributeValue(caseData,'DESIGNATIONS_GROUP_1')
let designationsGroup2 = returnAttributeValue(caseData,'DESIGNATIONS_GROUP_2')

inventorCount = parseInt(inventorCount) || 0;

let clientIsAmazon

let logicalAnchorsToDelete = [];

logicalAnchorsToDelete.push('<<<ALWAYSDELETE>>>');

if (applicationFilingDatePlus18MFUTUREorPAST === 'FUTURE') {
    logicalAnchorsToDelete.push('<<<APPLICATION_FILING_DATE_PLUS_18M_IN_PAST>>>')
}

if (applicationFilingDatePlus18MFUTUREorPAST === 'PAST') {
    logicalAnchorsToDelete.push('<<<APPLICATION_FILING_DATE_PLUS_18M_IN_FUTURE>>>')
}

if (priorityDatePlus18MFUTUREorPAST === 'FUTURE') {
    logicalAnchorsToDelete.push('<<<PRIORITY_DATE_PLUS_18M_IN_PAST>>>')
}

if (priorityDatePlus18MFUTUREorPAST === 'PAST') {
    logicalAnchorsToDelete.push('<<<PRIORITY_DATE_PLUS_18M_IN_FUTURE>>>')
}

if (parentFilingDateUS.trim() !== "") {
    logicalAnchorsToDelete.push('<<<PARENTFILINGDATEUS_IS_BLANK>>>')
}

//GB convention, not divisional
if (basis === 'N' || ['K', 'D'].includes(category) || countryCode !== 'GB') {
    logicalAnchorsToDelete.push('<<<GB_CONVENTION>>>');
}

//GB non-convention
if (basis === 'Y' || ['K', 'D'].includes(category) || countryCode !== 'GB') {
    logicalAnchorsToDelete.push('<<<GB_NON_CONVENTION>>>');
}

//GB Divisional
if (category !== 'D' || countryCode !== 'GB') {
    logicalAnchorsToDelete.push('<<<GB_DIVISIONAL>>>');
}

//GBW
if (category !== 'K' || countryCode !== 'GB') {
    logicalAnchorsToDelete.push('<<<GBW>>>');
}

//CATEGORY_IS_K_AND_COUNTRY_GB
if (category !== 'K' || countryCode !== 'GB') {
    logicalAnchorsToDelete.push('<<<CATEGORY_IS_K_AND_COUNTRY_GB>>>');
}

if (category === 'P') {
    logicalAnchorsToDelete.push('<<<CATEGORY_NOT_P>>>');
}

if (category !== 'P') {
    logicalAnchorsToDelete.push('<<<CATEGORY_IS_P>>>');
}

if (category === 'K') {
    logicalAnchorsToDelete.push('<<<CATEGORY_NOT_K>>>');
}

if (category !== 'K') {
    logicalAnchorsToDelete.push('<<<CATEGORY_IS_K>>>');
}


if (category === 'N') {
    logicalAnchorsToDelete.push('<<<CATEGORY_NOT_N>>>');
}

if (category !== 'N') {
    logicalAnchorsToDelete.push('<<<CATEGORY_IS_N>>>');
}

if (category === 'BC') {
    logicalAnchorsToDelete.push('<<<CATEGORY_NOT_BC>>>');
}

if (category !== 'BC') {
    logicalAnchorsToDelete.push('<<<CATEGORY_IS_BC>>>');
}

if (!(['BC', 'K'].includes(category))) {
    logicalAnchorsToDelete.push('<<<CATEGORY_IS_BC_OR_K>>>');
}

if (['BC', 'K'].includes(category)) {
    logicalAnchorsToDelete.push('<<<CATEGORY_IS_NOT_BC_OR_K>>>');
}

if (category === 'D') {
    logicalAnchorsToDelete.push('<<<CATEGORY_NOT_D>>>');
}

if (category !== 'D') {
    logicalAnchorsToDelete.push('<<<CATEGORY_IS_D>>>');
}

if (category === 'I') {
    logicalAnchorsToDelete.push('<<<CATEGORY_NOT_I>>>');
}

if (category !== 'I') {
    logicalAnchorsToDelete.push('<<<CATEGORY_IS_I>>>');
}

if (category === 'C') {
    logicalAnchorsToDelete.push('<<<CATEGORY_NOT_C>>>');
}

if (category !== 'C') {
    logicalAnchorsToDelete.push('<<<CATEGORY_IS_C>>>');
}

if (['D', 'C', 'I'].includes(category)) {
    logicalAnchorsToDelete.push('<<<CATEGORY_NOT_D_C_I>>>');
}

if (!(['D', 'C', 'I'].includes(category))) {
    logicalAnchorsToDelete.push('<<<CATEGORY_IS_D_C_I>>>');
}


if (countryCode !== 'EP') {
    logicalAnchorsToDelete.push('<<<COUNTRY_IS_EP>>>');
}

if (epoasisa.trim() === "") {
    logicalAnchorsToDelete.push('<<<DATE_ISR_DRAWN_UP_BY_EPO_NOT_BLANK>>>');
}

if (epoWasNotIsa.trim() === "") {
    logicalAnchorsToDelete.push('<<<DATE_ISR_DRAWN_UP_NOT_EPO_NOT_BLANK>>>');
}

if (countryCode !== 'GB') {
    logicalAnchorsToDelete.push('<<<COUNTRY_GB>>>');
}

if (countryCode === 'GB') {
    logicalAnchorsToDelete.push('<<<COUNTRY_NOT_GB>>>');
}


if (countryCode !== 'US') {
    logicalAnchorsToDelete.push('<<<COUNTRY_US>>>');
}

if (countryCode === 'US') {
    logicalAnchorsToDelete.push('<<<COUNTRY_NOT_US>>>');
}

if (countryCode !== 'PCT') {
    logicalAnchorsToDelete.push('<<<COUNTRY_PCT>>>');
}

if (countryCode === 'PCT') {
    logicalAnchorsToDelete.push('<<<COUNTRY_IS_PCT>>>');
}

if (countryCode === 'PCT') {
    logicalAnchorsToDelete.push('<<<COUNTRY_NOT_PCT>>>');
}

//EP or EP#
if (['K', 'D'].includes(category) || countryCode !== 'EP') {
    logicalAnchorsToDelete.push('<<<EP_OR_EP_NON_CONVENTION>>>');
}

//EP Divisional
if (category !== 'D' || countryCode !== 'EP') {
    logicalAnchorsToDelete.push('<<<EP_DIVISIONAL>>>');
}

//EPW EPO was ISA
if (epoasisa.trim() === '' || category !== 'K' || countryCode !== 'EP') {
    logicalAnchorsToDelete.push('<<<EPW_EPO_WAS_ISA>>>');
}

//EPW_EPO_Was_ISA
if (!(epoasisa.trim() === '' || category !== 'K' || countryCode !== 'EP')) {
    logicalAnchorsToDelete.push('<<<EPW_EPO_WAS_NOT_ISA>>>');
}

//Foreign CC or Foreign CCW Divisional
if (["EP", "US", "HK", "GB", "PCT"].includes(countryCode) || category === "K") {
    logicalAnchorsToDelete.push('<<<TEXT_FOREIGN_CC>>>');
}

//HK Re-registration
if (category !== 'R' || countryCode !== 'HK') {
    logicalAnchorsToDelete.push('<<<HK_REGISTRATION>>>');
}

//Foreign CCW
if (category !== 'K' || ["GB", "US", "EP"].includes(countryCode)) {
    logicalAnchorsToDelete.push('<<<TEXT_FOREIGN_CCW>>>');
}

//Text_USP
if (category !== 'P') {
    logicalAnchorsToDelete.push('<<<TEXT_USP>>>');
}
//Client is FA USP
if (clientIsFA === 'no') {
    logicalAnchorsToDelete.push('<<<CLIENT_IS_FA>>>');
}
if (clientIsFA !== 'no') {
    logicalAnchorsToDelete.push('<<<CLIENT_IS_NOT_FA>>>');
}
//US - all others
if (category === "P" || countryCode !== 'US') {
    logicalAnchorsToDelete.push('<<<TEXT_US>>>');
}

if( countryCode !== 'US' || category === "P" ){
    logicalAnchorsToDelete.push('<<<COUNTRY_US_CATEGORY_NOT_P>>>');
}

//WO
if (category !== 'N' || countryCode !== 'PCT') {
    logicalAnchorsToDelete.push('<<<TEXT_WO>>>');
}

//Foreign CCW Translation
if (category !== 'K' || ["GB", "US"].includes(countryCode) || pctEnglishSpeaking === 'Translation required') {
    logicalAnchorsToDelete.push('<<<TRANSLATION_CCW>>>');
}

//Monthly billing
if (monthlyBilling.toLowerCase() !== 'yes') {
    logicalAnchorsToDelete.push('<<<MONTHLY_BILLING_YES>>>');
}

if (monthlyBilling.toLowerCase() === 'yes') {
    logicalAnchorsToDelete.push('<<<MONTHLY_BILLING_NO>>>');
}

//US Text
if (category === 'K' || category === 'BC') {
    logicalAnchorsToDelete.push('<<<TEXT_IFNOTUSW>>>');
}

if (!(["K", "D", "I", "C", "BC"].includes(category))) {
    logicalAnchorsToDelete.push('<<<TEXT_IFUSWORUSD1ORUSC1ORUSCP1>>>');
}

if (!(["K", "D", "I", "C", "BC"].includes(category))) {
    logicalAnchorsToDelete.push('<<<CATEGORY_IS_EITHER_K_D_I_C_BC>>>');
}

if (["K", "D", "I", "C", "BC"].includes(category)) {
    logicalAnchorsToDelete.push('<<<TEXT_IFUSORUSHASH>>>');
}
if (["K", "D", "I", "C", "BC"].includes(category)) {
    logicalAnchorsToDelete.push('<<<CATEGORY_NOT_K_D_I_C_BC>>>');
}

//Form 9a
if (form9aFilingDate.includes('No') || form10FilingDate.includes('No')) {
    logicalAnchorsToDelete.push('<<<FORMS_NO_SEARCH_OR_EXAM>>>');
}

if (form9aFilingDate === 'Yes') {
    logicalAnchorsToDelete.push('<<<FORMS_NO_SEARCH_YET>>>');
    logicalAnchorsToDelete.push('<<<FORM9A_IS_NOT_YES>>>');
}

//FORM9a is yes
if (form9aFilingDate !== 'Yes') {
    logicalAnchorsToDelete.push('<<<FORM9A_IS_YES>>>');
}
//FORM9a is no
if (form9aFilingDate === 'Yes') {
    logicalAnchorsToDelete.push('<<<FORM9A_IS_NO>>>');
}
//Form 10
if (basis !== 'N' && form10FilingDate === 'Yes') {
    logicalAnchorsToDelete.push('<<<FORMS_SEARCH_ONLY>>>');
}
if (form9aFilingDate === 'Yes' && form10FilingDate === 'Yes') {
    logicalAnchorsToDelete.push('<<<FORM9A_IS_NO_AND_FORM10A_IS_NO>>>');
}

//EPO not isa header
if (epoWasNotIsa.trim() === "" && (["K", "EP"].includes(countryCode) || ["K", "EP"].includes(category)  )) {
    logicalAnchorsToDelete.push('<<<EP_HEADER_EPONOTISA>>>');
}

//Should delete text foreign cc
if (['EP', 'US', 'HK', 'GB', 'PCT'].includes(countryCode) || category === "K") {
    logicalAnchorsToDelete.push('<<<TEXT_FOREIGN_CC>>>');
    logicalAnchorsToDelete.push('<<<COUNTRY_NOT_EP_US_HK_GB_PCT_K>>>');
}

//Should delete text local FA
if (faNameCode in ['A950', 'A070']) {
    logicalAnchorsToDelete.push('<<<TEXT_LOCALFA>>>');
}

//Should delete text HK Registration
if (!(['R', 'HK'].includes(countryCode))) {
    logicalAnchorsToDelete.push('<<<TEXT_HK_REGISTRATION>>>');
    logicalAnchorsToDelete.push('<<<HK_REGISTRATION>>>');
    logicalAnchorsToDelete.push('<<<HKREGISTRATION>>>');
}

//Should delete text Foreign CCW
if (['GB', 'US', 'EP'].includes(countryCode) || category !== 'K') {
    logicalAnchorsToDelete.push('<<<TEXT_FORGEIGN_CCW>>>');
}

//Should delete text USP
if (category !== 'P') {
    logicalAnchorsToDelete.push('<<<TEXT_USP>>>');
}

//Should delete text US
if (category === 'P' || countryCode !== 'US') {
    logicalAnchorsToDelete.push('<<<TEXT_US>>>');
}

//Should delete text WO
if (category !== 'N' || countryCode !== 'PCT') {
    logicalAnchorsToDelete.push('<<<TEXT_WO>>>');
}



let isChoateOr3DMatix =  (instructorNameCode === 'A292' && ['P001','P002'].includes(applicantNameCode)) 

//Delete if the instructor / applicant is ChoatOr3DMatrix
if (isChoateOr3DMatix){
    logicalAnchorsToDelete.push('<<<IS_NOT_CHOAT_3DMATRIX>>>');
}

//Delete if the instructor / applicant is NOT ChoatOr3DMatrix
if (!isChoateOr3DMatix){
    logicalAnchorsToDelete.push('<<<IS_CHOAT_3DMATRIX>>>');
}



//Should delete if not Amazon
if (instructorNameCode !== '543') {
    logicalAnchorsToDelete.push('<<<IS_AMAZON>>>');
}

//Should delete if Amazon
if (instructorNameCode === '543') {
    logicalAnchorsToDelete.push('<<<IS_NOT_AMAZON>>>');
}

//Should delete if not Sonos
if (instructorNameCode !== '464') {
    logicalAnchorsToDelete.push('<<<IS_SONOS>>>');
}

//Should delete if is Sonos
if (instructorNameCode === '464') {
    logicalAnchorsToDelete.push('<<<IS_NOT_SONOS>>>');
}

//Should delete if not Tate & Lyle
if (instructorNameCode !== '440') {
    logicalAnchorsToDelete.push('<<<IS_TATE_&_LYLE>>>');
}

//Should delete if is Tate & Lyle
if (instructorNameCode === '440') {
    logicalAnchorsToDelete.push('<<<IS_NOT_TATE_&_LYLE>>>');
}

//Should delete if not MAERSK
if (instructorNameCode !== '926') {
    logicalAnchorsToDelete.push('<<<IS_MAERSK>>>');
}

//Should delete if is MAERSK
if (instructorNameCode === '926') {
    logicalAnchorsToDelete.push('<<<IS_NOT_MAERSK>>>');
}



//Should delete if not Zoox
if (instructorNameCode !== '1246') {
    logicalAnchorsToDelete.push('<<<IS_ZOOX>>>');
}

//Should delete if Zoox
if (instructorNameCode === '1246') {
    logicalAnchorsToDelete.push('<<<IS_NOT_ZOOX>>>');

}

//Should delete if not Ivalua
if (instructorNameCode !== '1154') {
    logicalAnchorsToDelete.push('<<<IS_IVALUA>>>');
}


//Should delete if not Ivalua
if (instructorNameCode === '1154') {
    logicalAnchorsToDelete.push('<<<IS_NOT_IVALUA>>>');
}

//Should delete if instructor is not OneTrust
if (instructorNameCode !== '1407') {
    logicalAnchorsToDelete.push('<<<IS_ONETRUST>>>');
}


//Should delete if instructor is OneTrust
if (instructorNameCode === '1407') {
    logicalAnchorsToDelete.push('<<<IS_NOT_ONETRUST>>>');
}

//Should delete if country not EIP
if (countryCode !== 'EP') {
    logicalAnchorsToDelete.push('<<<IS_EP>>>');
    logicalAnchorsToDelete.push('<<<COUNTRY_IS_EP>>>');
}
//Should delete if country is EIP
if (countryCode === 'EP') {
    logicalAnchorsToDelete.push('<<<IS_NOT_EP>>>');
    logicalAnchorsToDelete.push('<<<COUNTRY_IS_NOT_EP>>>');
}
//Should delete if category not K
if (category !== 'K') {
    logicalAnchorsToDelete.push('<<<IS_CATEGORY_K>>>');
}

//Should delete if category not K
if (category === 'K') {
    logicalAnchorsToDelete.push('<<<IS_NOT_CATEGORY_K>>>');
}

//Should delete if renewals handled elsewhere
if (renewalType !== '34' || (instructorNameCode === '543' || instructorNameCode === '464' || ownerNameCode === '543')) {
    logicalAnchorsToDelete.push('<<<RENEWALS_EIP_NOT_RESPONSIBLE>>>');
}

//Should delete if EIP is not handling renewals
if (renewalType !== '501') {
    logicalAnchorsToDelete.push('<<<RENEWALS_EIP_RESPONSIBLE>>>');
}

//Should delete if EIP is not handling renewals
if (renewalType === '501') {
    logicalAnchorsToDelete.push('<<<RENEWALS_EIP_NOT_RESPONSIBLE_TYPE_NOT_501>>>');
}

//Should delete if EIP is not handling renewals
if (!(['501', '34'].includes(renewalType) && ['543', '464'].includes(instructorNameCode))) {
    logicalAnchorsToDelete.push('<<<RENEWALS_EIP_ASSUME_RESPONSIBLE>>>');
}

//Owner is Visa Europe
logicalAnchorsToDelete.push(ownerNameCode === '290' ? '<<<OWNER_IS_NOT_VISA_EUROPE>>>' : '<<<OWNER_IS_VISA_EUROPE>>>');

logicalAnchorsToDelete.push(designatedCountries.toLowerCase().includes('italy') ? '<<<DESIGNATED_COUNTRY_NOT_ITALY>>>' : '<<<DESIGNATED_COUNTRY_IS_ITALY>>>'); 

logicalAnchorsToDelete.push(designatedCountries.toLowerCase().includes('germany') ? '<<<DESIGNATED_COUNTRY_NOT_GERMANY>>>' : '<<<DESIGNATED_COUNTRY_IS_GERMANY>>>'); 

if ( designationsGroup1.trim().length === 0 || designationsGroup2.trim().length === 0 ){
    logicalAnchorsToDelete.push('<<<DESIGNATION_1_AND_2_NOT_EMPTY>>>')
}

if ( designationsGroup1.trim().length === 0 || designationsGroup2.trim().length !== 0)  {
    logicalAnchorsToDelete.push('<<<DESIGNATION_1_NOT_EMPTY_2_EMPTY>>>')
}

if ( designationsGroup1.trim().length !== 0 || designationsGroup2.trim().length === 0)  {
    logicalAnchorsToDelete.push('<<<DESIGNATION_1_EMPTY_2_NOT_EMPTY>>>')
}

const spDefinedLogicalAnchors = processSPDefinedLogicalAnchors(caseData);
const finalArray = [...logicalAnchorsToDelete,...spDefinedLogicalAnchors];

return finalArray;

}
