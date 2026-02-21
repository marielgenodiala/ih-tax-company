import { ReactNode } from "react";
import Image from "next/image";

export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  category: string;
  readingTime: string;
  excerpt: string;
  image: string;
  imageAlt: string;
  content: ReactNode;
}

const ContactBlock = () => (
  <div className="contact-block">
    <strong>I H Professionals &amp; Co Pty Ltd</strong>
    Level 17, 9 Castlereagh Street SYDNEY NSW 2000
    <br />
    Email: info@ihprofessionals.com.au
    <br />
    Web: www.ihprofessionals.com
    <br />
    Tel: 02 8041 8276
  </div>
);

export const blogPosts: BlogPost[] = [
  {
    slug: "useful-links",
    title: "Useful Links",
    date: "5 January 2025",
    category: "Resources",
    readingTime: "2 Min",
    excerpt:
      "ABN Lookup, ASIC Registers, and other essential resources for businesses and individuals to manage their tax and compliance obligations.",
    image: "/images/blogs/useful-links.avif",
    imageAlt: "Useful links for businesses",
    content: (
      <>
        <h2>Essential Business Resources</h2>
        <p>
          <strong>ABN Lookup</strong> &ndash; where you can check ABN and GST status
          of a business:
          <br />
          <a href="https://abr.business.gov.au/" target="_blank" rel="noopener">
            abr.business.gov.au
          </a>
        </p>
        <p>
          <strong>ASIC Registers</strong> &ndash; where you can check availability of
          organisation and business names and search current and historical ASIC
          information:
          <br />
          <a href="https://connectonline.asic.gov.au/" target="_blank" rel="noopener">
            connectonline.asic.gov.au
          </a>
        </p>
        <p>
          <strong>ABR Australia Business Register</strong> &ndash; where you can apply
          for, update or cancel ABN:
          <br />
          <a href="https://www.abr.gov.au/" target="_blank" rel="noopener">
            abr.gov.au
          </a>
        </p>
        <p>
          <strong>Small Business Benchmarks</strong> &ndash; where you can compare
          your position against others in the same industry:
          <br />
          <a
            href="https://www.ato.gov.au/businesses-and-organisations/income-deductions-and-concessions/small-business-benchmarks/benchmarks-a-z"
            target="_blank"
            rel="noopener"
          >
            ato.gov.au/small-business-benchmarks
          </a>
        </p>

        <h2>Tax &amp; Compliance Tools</h2>
        <p>
          <strong>MyGov (now MyID)</strong> &ndash; where you can login and link your
          business and view ATO lodgment status and payment status as well as
          appointing tax agent:
          <br />
          <a href="https://mygovid.gov.au/" target="_blank" rel="noopener">
            mygovid.gov.au
          </a>
        </p>
        <p>
          <strong>Div 7A Tools and Calculator</strong> &ndash; where you have a Div
          7A loan and be able to calculate minimum repayment and interest component of
          loans:
          <br />
          <a
            href="https://www.ato.gov.au/calculators-and-tools/division-7a-calculator-and-decision-tool"
            target="_blank"
            rel="noopener"
          >
            ato.gov.au/division-7a-calculator
          </a>
        </p>
        <p>
          <strong>Land Tax Calculator</strong> &ndash; where you can register, view
          and calculate NSW land tax for your properties:
          <br />
          <a
            href="https://www.service.nsw.gov.au/transaction/calculate-your-nsw-land-tax"
            target="_blank"
            rel="noopener"
          >
            service.nsw.gov.au
          </a>
        </p>
        <p>
          <strong>Individual Tax Rates</strong> &ndash; where you can view individual
          tax rates across financial years at different income levels:
          <br />
          <a
            href="https://www.ato.gov.au/tax-rates-and-codes/tax-rates-australian-residents"
            target="_blank"
            rel="noopener"
          >
            ato.gov.au/tax-rates
          </a>
        </p>

        <h2>Payment &amp; Lodgement</h2>
        <p>
          <strong>Helping with Tax Debt Payments</strong> &ndash; where you can view,
          negotiate, set up a payment plan with the ATO for tax liabilities:
          <br />
          <a
            href="https://www.ato.gov.au/individuals-and-families/paying-the-ato/help-with-paying"
            target="_blank"
            rel="noopener"
          >
            ato.gov.au/help-with-paying
          </a>
        </p>
        <p>
          <strong>Lodgement Extension</strong> &ndash; where you cannot lodge your tax
          returns on time, here is where you can apply for, review and trace a
          lodgement deferral:
          <br />
          <a
            href="https://www.ato.gov.au/tax-and-super-professionals/for-tax-professionals/prepare-and-lodge/lodgment-program-deferrals"
            target="_blank"
            rel="noopener"
          >
            ato.gov.au/lodgment-deferrals
          </a>
        </p>
        <p>
          <strong>Work Related Deductions</strong> &ndash; where you can access
          ATO&apos;s MyDeductions app to record your tax related expenses on daily
          basis:
          <br />
          <a
            href="https://www.ato.gov.au/online-services/online-services-for-individuals-and-sole-traders/ato-app/mydeductions"
            target="_blank"
            rel="noopener"
          >
            ato.gov.au/mydeductions
          </a>
        </p>

        <h2>Business Management</h2>
        <p>
          <strong>Director ID Application</strong> &ndash; where you can verify your
          ID to act as a director for Australian companies:
          <br />
          <a href="https://www.abrs.gov.au/director-identification-number" target="_blank" rel="noopener">
            abrs.gov.au/director-id
          </a>
        </p>
        <p>
          <strong>Cash Flow Coaching Kit</strong> &ndash; where you can manage
          business cash flow to stay manageable and viable:
          <br />
          <a
            href="https://www.ato.gov.au/tax-and-super-professionals/for-tax-professionals/support-and-communication/in-detail/cash-flow-coaching-kit"
            target="_blank"
            rel="noopener"
          >
            ato.gov.au/cash-flow-coaching
          </a>
        </p>
        <p>
          <strong>Personal Services Income Rules (PSI)</strong> &ndash; where you can
          self-assess whether you are captured under the PSI rule:
          <br />
          <a
            href="https://www.ato.gov.au/businesses-and-organisations/income-deductions-and-concessions/personal-services-income"
            target="_blank"
            rel="noopener"
          >
            ato.gov.au/personal-services-income
          </a>
        </p>
        <p>
          <strong>Small Business Clearing House for Superannuation Payments</strong>{" "}
          &ndash; where you can set up, process and pay your employees superannuation
          based on eligibility:
          <br />
          <a
            href="https://www.ato.gov.au/businesses-and-organisations/super-for-employers/paying-super-contributions/how-to-pay-super/small-business-superannuation-clearing-house"
            target="_blank"
            rel="noopener"
          >
            ato.gov.au/super-clearing-house
          </a>
        </p>
        <p>
          <strong>Single Touch Payroll (STP)</strong> &ndash; where you can get an
          understanding of how STP works and get access to news, events, and
          resources:
          <br />
          <a
            href="https://www.ato.gov.au/businesses-and-organisations/hiring-and-paying-your-workers/single-touch-payroll"
            target="_blank"
            rel="noopener"
          >
            ato.gov.au/single-touch-payroll
          </a>
        </p>
        <p>
          <strong>Record Keeping Tools</strong> &ndash; where you can access resources
          for business record keeping templates and rules:
          <br />
          <a
            href="https://www.ato.gov.au/businesses-and-organisations/preparing-lodging-and-paying/record-keeping-for-business/setting-up-and-managing-records"
            target="_blank"
            rel="noopener"
          >
            ato.gov.au/record-keeping
          </a>
        </p>
      </>
    ),
  },
  {
    slug: "nsw-covid-19-support",
    title: "July 2021: NSW COVID-19 Support Packages",
    date: "22 July 2021",
    category: "Support Packages",
    readingTime: "3 Min",
    excerpt:
      "Considering the most recent Covid-19 lockdowns impacting Greater Sydney, the NSW and Commonwealth Governments have announced a range of economic stimulus packages and policies to support businesses and employees.",
    image: "/images/blogs/NSW COVID-19.avif",
    imageAlt: "NSW COVID-19 Support Packages",
    content: (
      <>
        <h2>1. Employment Protection</h2>
        <p>In a bid to protect employment rates, the NSW and Commonwealth Government will be distributing cash flow boosts of amounts up to $10,000 per week. This measure is set to be available from next week and it will be available to non-employing and employing entities, including not-for-profits.</p>
        <h3>Eligibility Criteria:</h3>
        <ul>
          <li>30% decrease in turnover compared to an equivalent two-week period in 2019</li>
          <li>Maintain full-time, part-time and long-term casual staffing levels as of 13 July 2021</li>
          <li>Businesses with annual turnover between $75,000 and $50 million</li>
        </ul>
        <p>The payment rate will be based on 40% of the NSW payroll payments and sole traders will have the payment capped at $1,000 per week.</p>
        <p>The payments will be administered by Service NSW.</p>

        <h2>2. Halt on Evictions</h2>
        <p>Businesses that have lost 25% or more of their annual revenue will be protected from forced evictions.</p>

        <h2>3. Deferred Payroll Tax</h2>
        <p>Businesses that pay less than $10 million in payroll will be granted a two-month extension to honour their payroll tax payables.</p>
        <h3>25% Reduction in Annual Payroll Tax Liabilities</h3>
        <p>Payroll tax customers who have between $1.2 million to $10 million in Australian wages will have their annual tax liability reduced by 25% when lodging their annual reconciliations. These customers must be able to prove a 30% decrease in turnover.</p>

        <h2>4. Covid-19 Business Grant</h2>
        <p>From 19 July 2021, eligible businesses with wages below $10 million that have been affected by lockdowns may be able to claim the following grants:</p>
        <ul>
          <li>30% or more reduction in turnover &mdash; <strong>$7,500</strong></li>
          <li>50% or more reduction in turnover &mdash; <strong>$10,500</strong></li>
          <li>70% or more reduction in turnover &mdash; <strong>$15,000</strong></li>
        </ul>
        <p>This aims to assist with ordinary business expenses i.e. rent, utilities and wages.</p>

        <h2>5. Micro Business Grant</h2>
        <p>Micro-businesses (small businesses/sole traders with annual turnovers between $30,000 &ndash; $75,000) may be eligible for a payment of up to $1,500 per fortnight from July 2021 if they experience a decline in turnover of 30%.</p>

        <h2>6. Landlords</h2>
        <p>Residential landlords who are not liable to pay land tax who reduce rent for tenants may be eligible for a capped grant of $1,500.</p>
        <p>Land tax relief may be available to the value of rent reductions provided by commercial, retail and residential landlords to financially distressed tenants, up to 100% of the 2021 land tax liability.</p>

        <h2>7. Covid-19 Disaster Payment</h2>
        <p>The government has also announced a Covid-19 disaster payment for employees who have lost 8 or more hours of work. The payments are as follows:</p>
        <ul>
          <li>8 &ndash; 20 hours lost &mdash; <strong>$375 / week</strong></li>
          <li>20 hours or more &mdash; <strong>$600 / week</strong></li>
        </ul>
        <h3>Criteria:</h3>
        <ul>
          <li>Australian resident</li>
          <li>17 or older</li>
          <li>Individual not receiving income support payments or Pandemic Leave Disaster Payment</li>
          <li>Individual lives, works or visited a Commonwealth-declared hotspot</li>
          <li>Individual had paid employment and because of Covid-19 hotspot restrictions you cannot attend work on or after the eighth day</li>
          <li>Individual does not have appropriately paid entitlements and has in fact lost income</li>
        </ul>
        <h3>Liquid Asset Test</h3>
        <p>Weeks 1&ndash;2, the individual must have liquid assets of less than $10,000. Weeks 3 and beyond, the liquid asset test does not apply.</p>

        <h2>How to Prepare?</h2>
        <ul>
          <li>Ensure business and contact details are up to date with our firm and consequently the Australian Business Register (ABR)</li>
          <li>Ensure your personal, contact and business details are up to date in your MyService NSW Account and Business Profile</li>
          <li>If you do not have one already, create a MyService NSW Account and Business Profile</li>
          <li>Register your interest for notifications when the programs become available</li>
        </ul>
        <p>We understand that these can be difficult times and with the grants being announced on an irregular basis it can be difficult to track. The above policies will have more defined information and criteria released in the coming weeks. As such, we will continue to keep you updated on the relevant information.</p>
        <p>If you need any assistance with the NSW COVID-19 Support Packages application, please feel free to contact us!</p>
        <ContactBlock />
      </>
    ),
  },
  {
    slug: "nsw-flood-disaster-recovery",
    title: "NSW Government\u2019s Flood Disaster Recovery Small Business Grant",
    date: "4 May 2021",
    category: "Grants",
    readingTime: "2 Min",
    excerpt:
      "If the recent NSW floods and storms have directly impacted your business, you may be eligible for the NSW Government\u2019s Flood Disaster Recovery Small Business Grant of up to $50,000.",
    image: "/images/blogs/NSW Governments Flood.avif",
    imageAlt: "NSW Flood Disaster Recovery",
    content: (
      <>
        <h2>Who Can Apply?</h2>
        <p>The grant is available for small businesses or not-for-profit organisations directly impacted by the NSW storms and floods from 10 March 2021 onwards.</p>

        <h2>What Are the Additional Requirements?</h2>
        <p>To be eligible, applicants must be a small business or a not-for-profit organisation in a defined disaster area. These areas include:</p>
        <div className="article-image">
          <Image src="/images/blogs/NSW Governments Flood image list .jpg" alt="List of defined disaster areas in NSW" width={800} height={600} style={{ width: "100%", height: "auto" }} />
        </div>
        <p>List taken from <a href="https://www.nsw.gov.au/topics/disaster-relief-and-support/natural-disaster-declarations" target="_blank" rel="noopener">nsw.gov.au/natural-disaster-declarations</a></p>

        <h2>What Can the Grant Be Used For?</h2>
        <p>It can help pay for costs associated with flood clean up and getting your business back up and running. Eligible expenses include (but are not limited to):</p>
        <ul>
          <li>Clean up</li>
          <li>Leasing temporary premises</li>
          <li>Replacing lost or damaged stock</li>
          <li>Tradespeople</li>
          <li>Hiring equipment</li>
          <li>Safety inspections</li>
        </ul>
        <p>The grant is <strong>not</strong> available for:</p>
        <ul>
          <li>Expenses that are covered under the small business or not-for-profit organisation&apos;s insurance policy</li>
          <li>Loss of income as a result of the floods</li>
        </ul>

        <h2>Required Documents for Your Application</h2>
        <ul>
          <li>A MyServiceNSW Account</li>
          <li>Your proof of identity</li>
          <li>Your valid ABN/ACN number</li>
          <li>Evidence of your non-profit status (if applicable)</li>
          <li>Your insurance details (if applicable)</li>
          <li>Your business banking details for payment</li>
        </ul>
        <h3>For amounts up to $50,000, you&apos;ll also need:</h3>
        <ul>
          <li>To nominate the grant amount you are claiming</li>
          <li>Evidence of the direct damage (in the form of photos and quotes, tax invoices or receipts)</li>
          <li>An itemised list of what you are proposing to spend the grant on</li>
        </ul>
        <p>If you&apos;re seeking more than $15,000, you&apos;ll need to provide invoices for completed work for the entire amount of funding for which you are applying.</p>

        <h2>How to Apply?</h2>
        <p>Applicants who are interested in applying for this grant may apply on the Service NSW official website or contact us for assistance!</p>
        <ContactBlock />
      </>
    ),
  },
  {
    slug: "nsw-small-business-fees",
    title: "NSW Small Business Fees and Charges Rebate",
    date: "20 April 2021",
    category: "Rebates",
    readingTime: "4 Min",
    excerpt:
      "The NSW Government is providing a Small Business Fees and Charges Rebate to help small businesses with the cost of government fees and charges, supporting recovery from the impact of COVID-19.",
    image: "/images/blogs/NSW Small Business Fees.avif",
    imageAlt: "NSW Small Business Fees and Charges Rebate",
    content: (
      <>
        <p>To support businesses to recover from the impact of the COVID-19 pandemic and incentivise business growth by reducing the cost of running a business, the NSW Government is providing a Small Business Fees and Charges Rebate (&apos;the Rebate&apos;) to help small businesses with the cost of government fees and charges.</p>
        <p>The rebate will be available from April 2021 until 11:59pm, 30 June 2022. Businesses can claim the rebate against invoices that were due and paid from 1 March 2021.</p>
        <p>The Rebate will be delivered by Service NSW on behalf of the NSW Government.</p>
        <p>By applying for the Rebate, applicants agree that their application may be subject to an audit by the NSW Government or its representatives. If information in the application is found to be untrue or misleading, Service NSW may seek to recover any payments. The matter may be referred to NSW Police and criminal penalties may apply.</p>

        <h2>1. What Is the Available Funding?</h2>
        <p>Eligible businesses and not-for-profits can apply for a one-off Rebate to the value of $1,500, which can be drawn down on multiple times until the full value of $1,500 is reached.</p>

        <h2>2. What Are the Requirements to Apply?</h2>
        <p>Small businesses (including non-employing sole traders) and not-for-profit organisations are eligible for $1,500 worth of rebates on government fees and charges if they:</p>
        <ul>
          <li>Have total Australian wages below the NSW Government 2020&ndash;21 payroll tax threshold of $1.2 million</li>
          <li>Have their own Australian Business Number (ABN) registered and/or are physically located and operating in New South Wales. Only one $1,500 rebate is available for a single ABN.</li>
          <li>Are registered for goods and services tax (GST)</li>
          <li>Have a turnover of at least $75,000 per year</li>
        </ul>
        <p><strong>Note:</strong> Not-for-profits are not subject to the GST requirement but must demonstrate they have a turnover of more than $75,000.</p>

        <h2>3. Additional Terms and Conditions</h2>
        <ul>
          <li>Applicants can submit multiple claims for the Rebate up to the $1,500 cap. They do not have to exhaust the entire $1,500 entitlement in one go.</li>
          <li>Applicants will be required to provide supporting documentation at the time of application (eligibility for the Rebate) and each time they draw down from the $1,500 entitlement (evidence of payment).</li>
          <li>Eligible businesses can only claim rebates for charges due and paid from 1 March 2021.</li>
          <li>If the business does not use the full rebate entitlement, the balance will lapse after 30 June 2022.</li>
          <li>If fees or charges exceed $1,500, the business is entitled to a rebate only up to the $1,500 cap.</li>
          <li>If businesses have received a waiver through a previous NSW or local government COVID-19 relief scheme, they are still entitled to a waiver of that fee for the following year.</li>
        </ul>

        <h2>4. Applicable Licence Fees and Charges</h2>
        <p>The Rebate covers NSW Government charges and fees and local council rates and charges related to the cost of doing business. All NSW Government fees and charges will be eligible, excepting those that are specifically excluded.</p>
        <h3>Exclusion Criteria:</h3>
        <ul>
          <li>Fines and penalties</li>
          <li>Fees and charges in place that have the key purpose of discouraging or inducing behaviour changes</li>
          <li>Commonwealth government charges</li>
          <li>Rent on government premises</li>
          <li>NSW and Commonwealth government taxes</li>
        </ul>

        <h2>5. Required Documents for Application</h2>
        <p>Evidence in support of eligibility at the time of applying for the Rebate include:</p>
        <ul>
          <li>Payroll tax</li>
          <li>Valid and active ABN</li>
          <li>GST registration</li>
          <li>Other evidence for not-for-profits</li>
        </ul>
        <p>To apply for the rebate, you&apos;ll also need:</p>
        <ul>
          <li>A MyServiceNSW Account</li>
          <li>Your proof of identity</li>
          <li>Your valid ABN/ACN</li>
          <li>Your business banking details for payment</li>
          <li>Other evidence for not-for-profits, including an accountant&apos;s letter verifying turnover of more than $75,000 per year</li>
        </ul>
        <p>You will need to supply supporting documentation when applying for the rebate and each time you make a claim. For each claim you make, you will need to provide invoices and receipts showing payment of eligible fees or charges.</p>

        <h2>6. How May the Rebate Be Used?</h2>
        <p>The Rebate is provided in the form of a digital credit, which businesses can draw down on to offset the cost of eligible NSW and local government fees and charges.</p>
        <p>Businesses apply for the Rebate through Service NSW&apos;s website, demonstrating proof of eligibility in line with the criteria set out above, at which point they are granted a digital credit to the value of $1,500.</p>
        <p>Businesses are able to claim the Rebate through their Service NSW Business Profile account, upon submitting proof of payment of any of the applicable licence fees and charges.</p>
        <p>Claims must be made by a legitimate applicant authorised to act on behalf of the eligible business.</p>

        <h2>7. Evaluation and Reporting</h2>
        <p>The intent of the Rebate is to support businesses to recover from the impact of the COVID-19 pandemic and incentivise business growth by reducing the cost of starting or running a business.</p>
        <p>Service NSW will survey businesses at the end of the Rebate to gather data on whether the Rebate has supported this intent. At the point of application businesses will be asked to tick a box if they consent to being contacted for monitoring and evaluation purposes.</p>
        <p>If you need any assistance with the NSW Small Business Fees and Charges Rebate application, please feel free to contact us!</p>
        <ContactBlock />
      </>
    ),
  },
  {
    slug: "nsw-business-events-grant",
    title: "NSW Business Events Grant Opportunity",
    date: "25 March 2021",
    category: "Grants",
    readingTime: "3 Min",
    excerpt:
      "The Australian Government has recently came up with a new program to further support industries negatively impacted by the COVID-19 pandemic \u2014 the Business Events Grant Program.",
    image: "/images/blogs/NSW Business Events Grant Opportunity.avif",
    imageAlt: "NSW Business Events Grant Opportunity",
    content: (
      <>
        <h2>1. What Is the Business Events Grant Program?</h2>
        <p>The Business Events Grant program aims to support the event industry including the tourism sector to fund Australian businesses to participate as buyers or sellers at pre-approved business events including exhibitions, conferences and conventions from 1 January 2021 to 31 December 2021. It aims to ease the financial pressure for business event organisers and to incentivise Australian business to participate as buyers/sellers at pre-approved events.</p>
        <p>Funding is to support the sustainability of events in government priority areas and to cover the cancellation costs that may occur to planned events due to COVID-19 outbreaks.</p>
        <p>The objective of the program is to:</p>
        <ul>
          <li>Support delegates that are buying or selling to participate in &apos;business events&apos;. Business events includes exhibitions, conferences, and conventions</li>
          <li>Promote Australian businesses, including to a domestic audience</li>
        </ul>
        <p>The focus of the program is to support the promotion of Australian business capability, including to a domestic audience, bolster supply chain resilience, enhance industry match making opportunities and Australian product and service value add. Events will need to have a trade element that brings together buyers and sellers.</p>

        <h2>2. Program Details</h2>
        <p><strong>Application due date:</strong> 30 Mar 2021 05:00 PM AEDT</p>
        <p><strong>Note:</strong> The closing date for grant applications (Phase 2) will be extended to 30 June 2021.</p>
        <p><strong>Application detail:</strong> This program is demand driven and will be open until all funding has been allocated.</p>
        <p><strong>What do you get?</strong> Grant funding from $5,000 per entity per application up to a maximum of $250,000.</p>
        <p><strong>Who is this for?</strong> Australian businesses including sole traders.</p>

        <h2>3. Eligibility Criteria</h2>
        <p>To be eligible you must have an ABN and be one of the following entities:</p>
        <ul>
          <li>An individual (sole trader)</li>
          <li>A partnership</li>
          <li>A company, incorporated in Australia</li>
          <li>An incorporated trustee on behalf of a trust</li>
          <li>An Industry Association promoting the selling or buying of a product or service on behalf of its members</li>
        </ul>

        <h2>4. Additional Eligibility Requirements</h2>
        <p>According to the official additional eligibility requirements ruled out by the Australian Government, applicants will also need to fulfil the following criteria:</p>
        <ul>
          <li>You intend to register to attend one or more of the events on the Schedule of Approved Business Events</li>
          <li>Your attendance at an approved event will assist your business to:
            <ul>
              <li>Develop your marketplace diversification (particularly to the domestic market)</li>
              <li>Improve supply chain value and resilience for the Australian economy</li>
              <li>Enhance your ability to pivot to new markets</li>
              <li>Support Australia&apos;s regional economy</li>
            </ul>
          </li>
          <li>Your business aligns with a government priority sector and the sector benefits from your attendance and participation in the event</li>
          <li>You have a minimum of $20,000 in total eligible project expenditure</li>
          <li>You can provide evidence from your board (or CEO or equivalent) that the project is supported, and that you can complete the project and meet the costs not covered by grant funding</li>
        </ul>

        <h2>5. Government Priority Sectors</h2>
        <ul>
          <li>Mining</li>
          <li>Food and agribusiness</li>
          <li>Oil and gas</li>
          <li>Medical products</li>
          <li>Clean energy</li>
          <li>Plastics and waste recycling</li>
          <li>Defence</li>
          <li>Space</li>
          <li>Enabling digital technologies</li>
          <li>Tourism</li>
          <li>Design</li>
          <li>Fashion</li>
          <li>Media</li>
        </ul>

        <h2>6. How to Apply?</h2>
        <p>Applicants should read the grant opportunity guidelines and sample grant agreement before you apply.</p>
        <p>To apply, you must submit your application through the online portal. You&apos;ll need to set up an account when you first log into the portal. The portal allows you to apply for and manage a grant or service in a secure online environment.</p>
        <p>If you need any assistance with the NSW Business Events Grant application, please feel free to contact us!</p>
        <ContactBlock />
      </>
    ),
  },
  {
    slug: "nsw-homebuilder-grant",
    title: "What You Need to Know about the NSW HomeBuilder Grant Extension?",
    date: "11 February 2021",
    category: "Grants",
    readingTime: "2 Min",
    excerpt:
      "On 29 November 2020, the Australian Government announced an extension to the HomeBuilder program to 31 March 2021, with key changes to grant amounts, property price caps, and construction timeframes.",
    image: "/images/blogs/What You Need to Know.avif",
    imageAlt: "NSW HomeBuilder Grant Extension",
    content: (
      <>
        <p>On 29 November 2020, the Australian Government announced an extension to the HomeBuilder program to 31 March 2021.</p>

        <h2>Changes to the HomeBuilder Program</h2>
        <p>Changes to the HomeBuilder program include:</p>
        <ul>
          <li>A <strong>$15,000 grant</strong> for building contracts (new builds and substantial renovations) signed between 1 January 2021 and 31 March 2021, inclusive.</li>
          <li>An <strong>extended deadline</strong> for all applications to be submitted, including those applying for the $25,000 grant and the new $15,000 grant. Applications can now be submitted up until 14 April 2021 (inclusive). This will apply to all eligible contracts signed on or after 4 June 2020.</li>
          <li>An <strong>extension to the construction commencement timeframe</strong> from three months to six months for all HomeBuilder applicants. This will apply to all eligible contracts signed on or after 4 June 2020.</li>
          <li>An <strong>increase to the property price cap</strong> for new build contracts in New South Wales and Victoria to $950,000 and $850,000, respectively, where the contract is signed between 1 January 2021 and 31 March 2021, inclusive.</li>
        </ul>
        <p><strong>Note:</strong> The existing new build property price cap of $750,000 will continue to apply in all other States and Territories.</p>

        <h2>Changes in Licensing Requirements</h2>
        <p>A change in licensing requirements and registration for builders:</p>
        <ul>
          <li>Where an eligible contract is signed <strong>on or after 29 November 2020</strong>, the builder must have a valid licence or registration before 29 November 2020.</li>
          <li>Where an eligible contract is signed <strong>before 29 November 2020</strong>, the builder must have a valid licence or registration before 4 June 2020.</li>
        </ul>

        <h2>Existing Criteria</h2>
        <p>Other than the above, the existing program criteria applies. That is, the other existing eligibility criteria remains in place and the <strong>$25,000 grant</strong> will still be available for eligible contracts signed on or before 31 December 2020.</p>
        <p>For more information, please contact us!</p>
        <ContactBlock />
      </>
    ),
  },
];

export function getBlogPost(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug);
}

export function getRecentPosts(excludeSlug: string, count = 3): BlogPost[] {
  return blogPosts.filter((post) => post.slug !== excludeSlug).slice(0, count);
}
