import { SharedStatus, AccountType, PersonCaste, Occupation, MaritalStatus, EducationalQualification, ChooseOptions, DocumentType } from "@bank-app-common/enum/SharedEnum"
import type { FormStructure, SearchInterface, SearchProps } from "@src/shared/SharedInterface"
import type { BankAccountInterface } from "./useBankAccountState"
import { useEffect, useState } from "react";
import { searchResetData } from "@src/shared/SharedResetData";
import { BankAccountService, BranchManagementService, CustomerService, type AddressInfoRequestDto, type CreateBankAccountDto } from "@src/openapi-request";
import { useLoading } from "@context/LoadingContext";
import type { CustomerInterface } from "./CustomerState";
import { toast } from "react-toastify";
import { mapOptionLabel } from "@src/shared/SharedFunctions";
import { CountryList } from "@bank-app-common/shared-data/country-list"
import { GenderType, PersonTitle } from "../../@bank-app-common/enum/SharedEnum";
import { DateAndTimeService } from "../../@bank-app-common/service/date-service";


export const useAddUpdateBankAccountState = () => {
    const { setIsLoading, isLoading } = useLoading();
    const [customerList, setCustomerList] = useState<CustomerInterface[]>([]);
    const [formTitle, setFormTitle] = useState("Add Bank Account");
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [search, setSearchParams] = useState<SearchInterface>({ limit: 500 });
    const [bankBranches, setBankBranchesState] = useState<any[]>([]);
    const [isResidentAddSameAsPmAdd, setResidentAddSameState] = useState<boolean>(false);

    const [branchSearch, setBranchSearchParams] = useState<SearchProps>({
        fieldName: '',
        fieldValue: '',
        limit: 500,
        page: 1,
    });

    const [bankDetailModel, setBankDetailModel] = useState({
        branchCode: null,
        accountType: null,
        accountNumber: null,
        status: null,
    });
    const [countryLabels, setCountryLabels] = useState(
        CountryList.map(item => {
            return {
                label: item?.name,
                value: item?.code
            }
        })
    )


    const [personalDetailModel, setPersonalDetailModel] = useState({
        firstName: null,
        middleName: null,
        lastName: null,
        guardianName: null,
        gender: null,
        dateOfBirth: null,
        maritalStatus: null,
        category: null,
        occupation: null,
        education: null,
        nationality: null,
        countryOfBirth: null,
        countryOfResidence: null,
    });
    const [permanentAddressModel, setPermanentAddressModel] = useState<AddressInfoRequestDto>({
        addressLine1: '',
        addressLine2: '',
        houseNo: '',
        buildingName: '',
        streetNo: '',
        streetName: '',
        landmark: '',
        city: '',
        district: '',
        state: '',
        postalCode: '',
        country: ''
    });

    const [residentialAddressModel, setResidentialAddressModel] = useState<AddressInfoRequestDto>({
        sameAddress: false,
        addressLine1: '',
        addressLine2: '',
        houseNo: '',
        buildingName: '',
        streetNo: '',
        streetName: '',
        landmark: '',
        city: '',
        district: '',
        state: '',
        postalCode: '',
        country: ''
    });

    const [correspondingAddressModel, setCorrespondingAddressModel] = useState<AddressInfoRequestDto>({
        sameAddress: false,
        addressLine1: '',
        addressLine2: '',
        houseNo: '',
        buildingName: '',
        streetNo: '',
        streetName: '',
        landmark: '',
        city: '',
        district: '',
        state: '',
        postalCode: '',
        country: ''
    });

    const [communicationModel, setCommunicationModel] = useState({
        telephone: null,
        mobileNo: null,
        email: null,
    });

    const [kycModel, setKycModel] = useState({
        kycDocumentProvided: null,
        nominationRequired: null,
        introducerName: null,
        accountNumber: null,
        panNumber: null,
        kycDocumentType: null,
        officialIdNo: null,
        perAnnumIncome: null,
        requestedAddOn: null,
    });
    const [addOnDetailModel, setAddOnDetailState] = useState({
        requestedDebitCard: null,
        eStatement: null,
        chequeBook: null,
        mobileBanking: null,
        internetBanking: null,
        creditCard: null,
    });
    useEffect(() => {
        setSearchParams(prev => ({
            ...prev,
            limit: 500
        }))
        getCustomersList();
    }, [search.fieldValue]);

    useEffect(() => {
        getBankBrancheList();
        console.log("bankBranchesbankBranches", bankBranches)
    }, [branchSearch.fieldValue]);
    const bankAccountDetail: FormStructure[] = [
        {
            label:
                "Name & Code Of the Branch",
            fieldName: "branchCode",
            dataType: "options",
            required: true,
            visible: true,
            options: bankBranches.length ? bankBranches?.map((branch) => {
                return { label: `${branch.branchName}, ${branch.branchCode}`, value: branch.branchCode }
            }) : [],
            searchItems: (e: any) => {
                console.log("dsjflkdjfklsdjfksdlfjdsklfjfklds", e)
                setBranchSearchParams(prev => ({
                    ...prev,
                    fieldName: 'branchName',
                    fieldValue: e
                }))
                getBankBrancheList()
            }
        },
        { label: "Account Type", fieldName: "accountType", dataType: "options", required: true, visible: true, options: mapOptionLabel(AccountType) },
        { label: "Account Status", fieldName: "status", dataType: "options", required: true, visible: true, options: mapOptionLabel(SharedStatus) },
    ]

    const personalDetailStructure: FormStructure[] = [
        { label: "Title", fieldName: "title", dataType: "options", required: true, visible: true, options: mapOptionLabel(PersonTitle) },
        { label: "First Name", fieldName: "firstName", dataType: "text", required: true, visible: true },
        { label: "Middle Name", fieldName: "middleName", dataType: "text", required: true, visible: true },
        { label: "Last Name", fieldName: "lastName", dataType: "text", required: true, visible: true },
        { label: "Father/ Husband/Guardian Name", fieldName: "guardianName", dataType: "text", required: true, visible: true },
        { label: "Gender", fieldName: "gender", dataType: "options", required: true, visible: true, options: mapOptionLabel(GenderType) },
        { label: "Date of Birth:", fieldName: "dateOfBirth", dataType: "date", required: true, visible: true },
        { label: "Marital Status", fieldName: "maritalStatus", dataType: "options", required: true, visible: true, options: mapOptionLabel(MaritalStatus) },
        { label: "Category", fieldName: "category", dataType: "options", required: true, visible: true, options: mapOptionLabel(PersonCaste) },
        { label: "Occupation", fieldName: "occupation", dataType: "options", required: true, visible: true, options: mapOptionLabel(Occupation) },
        { label: "Educational Qualification", fieldName: "education", dataType: "options", required: true, visible: true, options: mapOptionLabel(EducationalQualification) },
        { label: "Nationality", fieldName: "nationality", dataType: "options", required: true, visible: true, options: countryLabels },
        { label: "Country Of Birth", fieldName: "countryOfBirth", dataType: "options", required: true, visible: true, options: countryLabels },
        { label: "Country Of Residence", fieldName: "countryOfResidence", dataType: "options", required: true, visible: true, options: countryLabels },
    ]
    const permanentAddressStructure: FormStructure[] = [
        { label: "Address Line 1:", fieldName: "addressLine1", dataType: "text", required: true, visible: true },
        { label: "Address Line 2:", fieldName: "addressLine2", dataType: "text", required: true, visible: true },
        { label: "House No", fieldName: "houseNo", dataType: "text", required: true, visible: true },
        { label: "House name", fieldName: "houseName", dataType: "text", required: true, visible: true },
        { label: "Street No", fieldName: "streetNo", dataType: "text", required: true, visible: true },
        { label: "Street name", fieldName: "streetName", dataType: "text", required: true, visible: true },
        { label: "Landmark", fieldName: "landmark", dataType: "text", required: true, visible: true },
        { label: "Village /City", fieldName: "city", dataType: "text", required: true, visible: true },
        { label: "District", fieldName: "district", dataType: "text", required: true, visible: true },
        { label: "State", fieldName: "state", dataType: "text", required: true, visible: true },
        { label: "Pin code", fieldName: "pincode", dataType: "text", required: true, visible: true },
        { label: "Country", fieldName: "country", dataType: "options", required: true, visible: true, options: countryLabels },
    ]
    const residentialAddressStructure: FormStructure[] = [
        {
            label: "Same As Permanent Address", fieldName: "sameAddress", dataType: "checkbox", required: true, visible: true, single: true, onChange: (val: any) => {
                updateAddressSame(val, 'resident');
            }
        },
        { label: "Address Line 1:", fieldName: "addressLine1", dataType: "text", required: true, visible: true },
        { label: "Address Line 2:", fieldName: "addressLine2", dataType: "text", required: true, visible: true },
        { label: "House No", fieldName: "houseNo", dataType: "text", required: true, visible: true },
        { label: "House name", fieldName: "houseName", dataType: "text", required: true, visible: true },
        { label: "Street No", fieldName: "streetNo", dataType: "text", required: true, visible: true },
        { label: "Street name", fieldName: "streetName", dataType: "text", required: true, visible: true },
        { label: "Landmark", fieldName: "landmark", dataType: "text", required: true, visible: true },
        { label: "Village /City", fieldName: "city", dataType: "text", required: true, visible: true },
        { label: "District", fieldName: "district", dataType: "text", required: true, visible: true },
        { label: "State", fieldName: "state", dataType: "text", required: true, visible: true },
        { label: "Pin code", fieldName: "pincode", dataType: "text", required: true, visible: true },
        { label: "Country", fieldName: "country", dataType: "options", required: true, visible: true, options: countryLabels },
    ]
    const correspondingAddressStructure: FormStructure[] = [
        {
            label: "Same As Residential Address", fieldName: "sameAddress", dataType: "checkbox", required: true, visible: true, single: true, onChange: (val: any) => {
                updateAddressSame(val, 'corresponding');
            }
        },
        { label: "Address Line 1:", fieldName: "addressLine1", dataType: "text", required: true, visible: true },
        { label: "Address Line 2:", fieldName: "addressLine2", dataType: "text", required: true, visible: true },
        { label: "House No", fieldName: "houseNo", dataType: "text", required: true, visible: true },
        { label: "House name", fieldName: "houseName", dataType: "text", required: true, visible: true },
        { label: "Street No", fieldName: "streetNo", dataType: "text", required: true, visible: true },
        { label: "Street name", fieldName: "streetName", dataType: "text", required: true, visible: true },
        { label: "Landmark", fieldName: "landmark", dataType: "text", required: true, visible: true },
        { label: "Village /City", fieldName: "city", dataType: "text", required: true, visible: true },
        { label: "District", fieldName: "district", dataType: "text", required: true, visible: true },
        { label: "State", fieldName: "state", dataType: "text", required: true, visible: true },
        { label: "Pin code", fieldName: "pincode", dataType: "text", required: true, visible: true },
        { label: "Country", fieldName: "country", dataType: "options", required: true, visible: true, options: countryLabels },

    ]
    const commuincationStructure: FormStructure[] = [
        { label: "Telephone/Landline", fieldName: "telephone", dataType: "text", required: true, visible: true },
        { label: "Mobile No.", fieldName: "mobileNo", dataType: "text", required: true, visible: true },
        { label: "Email Address", fieldName: "email", dataType: "text", required: true, visible: true },
    ]
    const kycStructure: FormStructure[] = [
        { label: "KYC Documents Provided", fieldName: "kycDocumentProvided", dataType: "options", required: true, visible: true, options: mapOptionLabel(ChooseOptions) },
        { label: "Nomination Required", fieldName: "nominationRequired", dataType: "options", required: true, visible: true, options: mapOptionLabel(ChooseOptions) },
        { label: "Introduction [if applicable]: Name of the introducer", fieldName: "introducerName", dataType: "text", required: true, visible: true },
        // { label: "Customer ID", fieldName: "customerId", dataType: "text", required: true, visible: true },
        // { label: "Account No.", fieldName: "accountNumber", dataType: "text", required: true, visible: true },
        { label: "PAN No.", fieldName: "panNumber", dataType: "text", required: true, visible: true },
        { label: "KYC Document", fieldName: "kycDocumentType", dataType: "options", required: true, visible: true, options: mapOptionLabel(DocumentType) },
        { label: "Aadhar/Citizenship/National ID/NRIC No.", fieldName: "officialIdNo", dataType: "text", required: true, visible: true },
        { label: "Income Per Annum", fieldName: "perAnnumIncome", dataType: "options", required: true, visible: true },
        { label: "Request for add on", fieldName: "requestedAddOn", dataType: "options", required: true, visible: true, options: mapOptionLabel(ChooseOptions) },
        // { label: "Balance", fieldName: "balance", dataType: "number", required: true, visible: true },
        // { label: "Account Holders", fieldName: "accountHolders", dataType: "array", required: false, visible: false },

        // { label: "Currency", fieldName: "currency", dataType: "options", required: true, visible: true, options: Object.values(CurrencyType).map(currencyType => ({ label: currencyType, value: currencyType })) },
        // {
        //     label: "Customer ID", fieldName: "customerId", dataType: "options", required: true, visible: true, options: customerList?.map(customer => {
        //         return {
        //             label: customer?.fullName,
        //             value: customer?._oid
        //         }
        //     })
        // },

        // { label: "Actions", fieldName: "action", dataType: "action", required: false, visible: false, actions: [] }
    ]
    //     e-Statement of Account Yes/No
    // 2. Cheque Book Yes/No
    // 3. Mobile Banking Yes/No
    // 4.. Internet Baking Yes/No
    // 5. Credit Card Yes/No
    const addOnFormStructure: FormStructure[] = [
        { label: "Request for ATM Debit Card", fieldName: "requestedDebitCard", dataType: "options", required: true, visible: true, options: mapOptionLabel(ChooseOptions) },
        { label: "e-Statement of Account", fieldName: "eStatement", dataType: "options", required: true, visible: true, options: mapOptionLabel(ChooseOptions) },
        { label: "Cheque Book", fieldName: "chequeBook", dataType: "options", required: true, visible: true, options: mapOptionLabel(ChooseOptions) },
        { label: "Mobile Banking", fieldName: "mobileBanking", dataType: "options", required: true, visible: true, options: mapOptionLabel(ChooseOptions) },
        { label: "Internet Banking", fieldName: "internetBanking", dataType: "options", required: true, visible: true, options: mapOptionLabel(ChooseOptions) },
        { label: "Credit Card", fieldName: "creditCard", dataType: "options", required: true, visible: true, options: mapOptionLabel(ChooseOptions) },
    ];
    const getCustomersList = async () => {
        setIsLoading(true);
        const { data: response } = await CustomerService.findAll(search)
        const customerList = response.data.map((customer: any) => {
            customer.fullName = (customer?.firstName + " " + customer?.lastName);
            return customer;
        })
        setIsLoading(false)
        setCustomerList(customerList);
        setIsLoading(false)
        let startFrom = response.currentPage > 1 ? (response.currentPage - 1) * (search.limit || 100) : 1;
        setSearchParams(prev => ({
            ...prev,
            totalPages: response.totalPages,
            total: response.total,
            startFrom,
        }))
        setIsLoading(false)
    }
    const getBankBrancheList = async () => {
        setIsLoading(true);
        const { data: response } = await BranchManagementService.branchDropdown(branchSearch)
        setBankBranchesState(response.data);
        let startFrom = response.currentPage > 1 ? (response.currentPage - 1) * (search.limit || 100) : 1;
        setBranchSearchParams(prev => ({
            ...prev,
            totalPages: response.totalPages,
            total: response.total,
            startFrom,
        }))
        setIsLoading(false);
    }
    const updateAddressSame = (isSame: boolean, addressType: string) => {
        console.log('updateAddressSame called', isSame)
        if (isSame) {
            if (addressType === 'resident') {
                setResidentialAddressModel(permanentAddressModel)
            }
            if (addressType === 'corresponding') {
                setCorrespondingAddressModel(permanentAddressModel)
            }
            // const updated = permanentAddressModel.map(item => ({ ...item, disabled: true }));
            // setResidentialAddressModel({ ...updated });
        }
        setResidentAddSameState(isSame)
    }
    const submitForm = async () => {
        try {
            setErrors("")
            setIsLoading(true);
            // console.log("Formbody", formBody)


            // formBody.customerOids = formBody?.customerId ? [formBody?.customerId] : []
            // formBody[customerOids]
            const response = await BankAccountService.create({
                requestBody: {
                    accountInfo: bankDetailModel,
                    personalInfo: personalDetailModel,
                    // personalInfo: {
                    //     ...personalDetailModel,
                    //     dateOfBirth: DateAndTimeService.convertDate(personalDetailModel.dateOfBirth),
                    // },
                    permanentAddressInfo: permanentAddressModel,
                    residentialAddressInfo: residentialAddressModel,
                    correspondingAddressInfo: correspondingAddressModel,
                    contactInfo: communicationModel,
                    kycInfo: kycModel,
                    addOnInfo: addOnDetailModel
                }
            })
            console.log("Formbody", {
                accountInfo: bankDetailModel,
                personalInfo: personalDetailModel,
                permanentAddressInfo: permanentAddressModel,
                residentialAddressInfo: residentialAddressModel,
                correspondingAddressInfo: correspondingAddressModel,
                contactInfo: communicationModel,
                kycInfo: kycModel,
                addOnInfo: addOnDetailModel

            }, response)
            toast.success(response.message);
            setIsLoading(false);
        } catch (error) {
            setIsLoading(false);
            console.log("errorerrorerror", error.body.message)
            toast.error("Failed to create customer. Please try again.");
            setErrors(error?.body?.message || error?.message || {});
            return {
                message: error?.body?.message ?? error.message,
                success: false
            };
        }
    }
    return {
        kycStructure,
        bankAccountDetail,
        personalDetailStructure,
        residentialAddressStructure,
        correspondingAddressStructure,
        commuincationStructure,
        permanentAddressStructure,
        bankDetailModel,
        setBankDetailModel,
        submitForm,
        setErrors,
        errors,
        personalDetailModel,
        setPersonalDetailModel,
        permanentAddressModel,
        setPermanentAddressModel,
        residentialAddressModel,
        setResidentialAddressModel,
        correspondingAddressModel,
        setCorrespondingAddressModel,
        communicationModel,
        setCommunicationModel,
        kycModel,
        setKycModel,
        addOnDetailModel,
        setAddOnDetailState,
        addOnFormStructure,
        updateAddressSame,
        isResidentAddSameAsPmAdd
    }

}