const currencyFormatter = new Intl.NumberFormat("en-IN",{
    style:"currency",
    currency:"INR",
    maximumFractionDigits:0, 
  })
export default function formatter(curr){
    return currencyFormatter.format(curr);
}