const { z } = window.Zod;

const schema = z.object({
    amount: z.number({ message: 'Invalid amount value'}).gt(0),
    term: z.number({ message: 'Invalid term value'}).gt(0),
    rate: z.number({ message: 'Invalid rate'}).gt(0),
    type: z.enum(['repayment', 'interestOnly'], { message: 'This field is required'})
})

const form = document.getElementById('form');
const amountInput = document.getElementById('amount');
const termInput = document.getElementById('term');
const rateInput = document.getElementById('rate');

const amountMsg = document.getElementById('error-amount')
const termMsg = document.getElementById('error-term')
const rateMsg = document.getElementById('error-rate')
const typeMsg = document.getElementById('error-type')

const resultBox = document.getElementById('resultBox');
const noResult = document.getElementById('noResult');

const monthlyRepayments = document.getElementById('monthlyRepayments');
const totalRepayments = document.getElementById('totalRepayment')


function resetErrors() {
    amountInput.parentElement.classList.remove('invalid')
    termInput.parentElement.classList.remove('invalid');
    rateInput.parentElement.classList.remove('invalid');

    amountMsg.innerHTML = ''
    termMsg.innerHTML = ''
    rateMsg.innerHTML = ''
    typeMsg.innerHTML = ''
}

function calculateRepayment(amount, rate, term) {
    const mRate = rate / (12 * 100);
    const payments = term * 12;
    const factor = (1 + mRate) ** payments;
    return (amount * mRate * factor) / (factor - 1)
}

function calculateInterestOnly(amount, rate) {
    return (amount * (rate/100)) / 12;
}


form.addEventListener('submit', function(evt) {
    evt.preventDefault();

    resetErrors()
    const data = new FormData(this);

    const result = schema.safeParse({
        amount: Number(data.get('amount')),
        term: Number(data.get('term')),
        rate: Number(data.get('rate')),
        type: data.get('type'),
    });

    console.log(result.data)
    if(!result.success) {
        //if invalid data
        const errors = result.error.flatten().fieldErrors;
        console.log(errors)
        for(const key in errors) {
            const input = document.getElementById(key);
            if(input) {
                parent = input.parentElement;
                parent.classList.add('invalid')
            }
            document.getElementById(`error-${key}`).innerHTML = errors[key].join(',')
        }
    } else {
        // else if data is valid

        noResult.classList.add('hidden')
        
        const { amount, term, rate, type} = result.data;

        let monthlyPayment, totalPayment;
        switch (type) {
            case 'repayment':
                monthlyPayment = calculateRepayment(amount, rate, term);
                totalPayment = monthlyPayment * term * 12;
                break;
            case 'interestOnly':
                monthlyPayment = calculateInterestOnly(amount, rate);
                totalPayment = monthlyPayment * term * 12 ;
                break;
            default:
                break;
        }

        resultBox.classList.remove('hidden');
        const opts = {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
            style: "currency",
            currency: "GBP"
        };
        totalRepayments.innerHTML = totalPayment.toLocaleString('en-uk', opts);
        monthlyRepayments.innerHTML = monthlyPayment.toLocaleString('en-uk', opts);

    }

    return ;
    
})