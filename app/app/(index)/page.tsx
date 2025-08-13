"use client";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Label } from "@/components/ui/label";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type Step = "aadhar" | "pan";

const aadharSchema = z.object({
  ctl00_ContentPlaceHolder1_txtadharno: z
    .string()
    .nonempty("Required")
    .regex(/^\d{12}$/, "Invalid Aadhar No"),
  ctl00_ContentPlaceHolder1_txtownername: z
    .string()
    .nonempty("Required")
    .max(100, "Max 100 Characters"),
  ctl00_ContentPlaceHolder1_chkDecarationA: z
    .boolean()
    .refine((val) => val === true, "You must Agree Declerations."),
});

const otpSchema = z.object({
  otp: z
    .string()
    .nonempty("Required")
    .regex(/^\d{6}$/, "Invalid OTP"),
});

const panSchema = z.object({
  organisationType: z
    .enum([
      "Proprietary",
      "Hindu Undivided Family",
      "Partnership",
      "Co-Operative",
      "Private Limited Company",
      "Public Limited Company",
      "Self Help Group",
      "Limited Liability Partnership",
      "Society",
      "Trust",
      "Others",
      "",
    ])
    .refine((val) => val !== undefined, {
      message: "Type of Organisation is required",
    }),

  panNumber: z
    .string()
    .nonempty("PAN is required")
    .regex(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/, "Invalid PAN format"),

  panHolderName: z
    .string()
    .nonempty("Name of PAN Holder is required")
    .max(100, "Max 100 characters"),

  dobOrDoi: z
    .string()
    .nonempty("DOB/DOI is required")
    .regex(
      /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/,
      "Invalid date format (DD/MM/YYYY)"
    ),

  consent: z.boolean().refine((val) => val === true, "You must give consent"),
});

export default function Home() {
  const [step, setStep] = useState<Step>("aadhar");
  const [aadharDisabled, setAadharDisabled] = useState<boolean>(false);
  const [otpDisabled, setOTPDisabled] = useState<boolean>(false);
  const [aadhaarValues, setAadharValues] = useState<{
    ctl00_ContentPlaceHolder1_txtadharno: string;
    ctl00_ContentPlaceHolder1_txtownername: string;
    ctl00_ContentPlaceHolder1_chkDecarationA: boolean;
  } | null>(null);

  const aadharForm = useForm<z.infer<typeof aadharSchema>>({
    resolver: zodResolver(aadharSchema),
    defaultValues: {
      ctl00_ContentPlaceHolder1_txtadharno: "",
      ctl00_ContentPlaceHolder1_txtownername: "",
      ctl00_ContentPlaceHolder1_chkDecarationA: false,
    },
  });

  const otpForm = useForm<z.infer<typeof otpSchema>>({
    resolver: zodResolver(otpSchema),
    defaultValues: {
      otp: "",
    },
  });

  const panForm = useForm<z.infer<typeof panSchema>>({
    resolver: zodResolver(panSchema),
    defaultValues: {
      organisationType: "",
      panNumber: "",
      panHolderName: "",
      dobOrDoi: "",
      consent: false,
    },
  });

  function aadharSubmit(values: z.infer<typeof aadharSchema>) {
    setAadharDisabled(true);
    setAadharValues({ ...values });
  }

  function OTPSubmit(values: z.infer<typeof otpSchema>) {
    setOTPDisabled(true);
    setStep("pan");
  }

  function panSubmit(values: z.infer<typeof panSchema>) {
    console.log(values);
  }

  return (
    <section className="flex flex-col justify-center items-center mb-8">
      <div className="w-full">
        <Breadcrumb className="mb-2">
          {!aadharDisabled && !otpDisabled && (
            <BreadcrumbList>
              <BreadcrumbItem className="hover:cursor-pointer">
                Aadhar Verification
              </BreadcrumbItem>
              <BreadcrumbSeparator />
            </BreadcrumbList>
          )}

          {aadharDisabled && otpDisabled && (
            <BreadcrumbList>
              <BreadcrumbItem
                className="hover:cursor-pointer"
                onClick={() => {
                  setStep("aadhar");
                }}
              >
                Aadhar Verification
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem
                className="hover:cursor-pointer"
                onClick={() => {
                  setStep("pan");
                }}
              >
                Pan Verification
              </BreadcrumbItem>
            </BreadcrumbList>
          )}
        </Breadcrumb>
      </div>

      <div className="shadow-xl border border-muted w-full rounded-2xl overflow-hidden">
        <Tabs
          defaultValue="aadhar"
          value={step}
          onValueChange={(value: string) => {
            setStep(value as Step);
          }}
        >
          <TabsContent value="aadhar">
            <header className="bg-[#007bff] px-8 py-4">
              <h1 className="text-background">Aadhar Verification With OTP</h1>
            </header>
            <div className="p-6">
              <Form {...aadharForm}>
                <form
                  onSubmit={aadharForm.handleSubmit(aadharSubmit)}
                  className="space-y-6 mb-8"
                >
                  {/* Aadhaar & Name fields */}
                  <div className="flex flex-col lg:flex-row justify-between items-center gap-4 mb-8">
                    <FormField
                      control={aadharForm.control}
                      name="ctl00_ContentPlaceHolder1_txtadharno"
                      render={({ field }) => (
                        <FormItem className="w-full relative">
                          <FormLabel>
                            <b>1. Aadhaar Number/ आधार संख्या</b>
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Your Aadhar No"
                              autoComplete="off"
                              disabled={aadharDisabled}
                              {...field}
                            />
                          </FormControl>
                          <FormMessage className="absolute top-[100%]" />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={aadharForm.control}
                      name="ctl00_ContentPlaceHolder1_txtownername"
                      render={({ field }) => (
                        <FormItem className="w-full relative">
                          <FormLabel>
                            <b>2. Name of Entrepreneur / उद्यमी का नाम</b>
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Name as per Aadhar"
                              autoComplete="off"
                              disabled={aadharDisabled}
                              {...field}
                            />
                          </FormControl>
                          <FormMessage className="absolute top-[100%]" />
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* Declaration text */}
                  <div className="px-4 lg:px-16">
                    <ul className="list-disc flex flex-col gap-4">
                      <li className="text-sm leading-none">
                        Aadhaar number shall be required for Udyam Registration.
                      </li>
                      <li className="text-sm leading-none">
                        The Aadhaar number shall be of the proprietor in the
                        case of a proprietorship firm, of the managing partner
                        in the case of a partnership firm and of a karta in the
                        case of a Hindu Undivided Family (HUF).
                      </li>
                      <li className="text-sm leading-none">
                        In case of a Company or a Limited Liability Partnership
                        or a Cooperative Society or a Society or a Trust, the
                        organisation or its authorised signatory shall provide
                        its GSTIN and PAN along with its Aadhaar number.
                      </li>
                    </ul>
                  </div>

                  {/* Checkbox field */}
                  <FormField
                    control={aadharForm.control}
                    name="ctl00_ContentPlaceHolder1_chkDecarationA"
                    render={({ field }) => (
                      <FormItem className="relative">
                        <FormControl>
                          <div className="text-sm flex flex-col lg:flex-row gap-2">
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                              disabled={aadharDisabled}
                            />
                            <p>
                              I, the holder of the above Aadhaar, hereby give my
                              consent to Ministry of MSME, Government of India,
                              for using my Aadhaar number as alloted by UIDAI
                              for Udyam Registration. NIC / Ministry of MSME,
                              Government of India, have informed me that my
                              aadhaar data will not be stored/shared. / मैं,
                              आधार धारक, इस प्रकार उद्यम पंजीकरण के लिए
                              यूआईडीएआई के साथ अपने आधार संख्या का उपयोग करने के
                              लिए सू0ल0म0उ0 मंत्रालय, भारत सरकार को अपनी सहमति
                              देता हूं। एनआईसी / सू0ल0म0उ0 मंत्रालय, भारत सरकार
                              ने मुझे सूचित किया है कि मेरा आधार डेटा संग्रहीत /
                              साझा नहीं किया जाएगा।
                            </p>
                          </div>
                        </FormControl>
                        <FormMessage className="absolute top-[100%]" />
                      </FormItem>
                    )}
                  />

                  {/* Submit */}
                  {!aadharDisabled && (
                    <Button
                      type="submit"
                      disabled={aadharDisabled}
                      className="mt-4"
                    >
                      Validate & Generate OTP
                    </Button>
                  )}
                </form>
              </Form>

              {aadharDisabled && (
                <div className="flex flex-col justify-center items-start gap-2">
                  <Form {...otpForm}>
                    <form
                      onSubmit={otpForm.handleSubmit(OTPSubmit)}
                      className="flex flex-col justify-center items-start gap-2"
                    >
                      <Label className="font-bold flex items-center gap-1">
                        <span className="text-red-500">*</span>
                        Enter One Time Password (OTP) Code
                      </Label>

                      <FormField
                        control={otpForm.control}
                        name="otp"
                        render={({ field }) => (
                          <FormItem className="relative mb-4">
                            <FormControl>
                              <InputOTP
                                maxLength={6}
                                {...field}
                                disabled={otpDisabled}
                              >
                                <InputOTPGroup>
                                  <InputOTPSlot index={0} />
                                  <InputOTPSlot index={1} />
                                  <InputOTPSlot index={2} />
                                  <InputOTPSlot index={3} />
                                  <InputOTPSlot index={4} />
                                  <InputOTPSlot index={5} />
                                </InputOTPGroup>
                              </InputOTP>
                            </FormControl>
                            <FormMessage className="absolute top-[100%]" />
                          </FormItem>
                        )}
                      />

                      <Button type="submit" disabled={otpDisabled}>
                        Validate
                      </Button>
                    </form>
                  </Form>
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="pan">
            <header className="bg-[#28a745] px-8 py-4">
              <h1 className="text-background">PAN Verification</h1>
            </header>
            <div className="p-6">
              <Form {...panForm}>
                <form
                  onSubmit={panForm.handleSubmit(panSubmit)}
                  className="space-y-6"
                >
                  {/* Organisation Type */}
                  <FormField
                    control={panForm.control}
                    name="organisationType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Type of Organisation</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Type of Organisation" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="Proprietary">
                              Proprietary
                            </SelectItem>
                            <SelectItem value="Hindu Undivided Family">
                              Hindu Undivided Family
                            </SelectItem>
                            <SelectItem value="Partnership">
                              Partnership
                            </SelectItem>
                            <SelectItem value="Co-Operative">
                              Co-Operative
                            </SelectItem>
                            <SelectItem value="Private Limited Company">
                              Private Limited Company
                            </SelectItem>
                            <SelectItem value="Public Limited Company">
                              Public Limited Company
                            </SelectItem>
                            <SelectItem value="Self Help Group">
                              Self Help Group
                            </SelectItem>
                            <SelectItem value="Limited Liability Partnership">
                              Limited Liability Partnership
                            </SelectItem>
                            <SelectItem value="Society">Society</SelectItem>
                            <SelectItem value="Trust">Trust</SelectItem>
                            <SelectItem value="Others">Others</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* PAN Number */}
                  <FormField
                    control={panForm.control}
                    name="panNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>PAN Number</FormLabel>
                        <FormControl>
                          <Input placeholder="ABCDE1234F" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* PAN Holder Name */}
                  <FormField
                    control={panForm.control}
                    name="panHolderName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name of PAN Holder</FormLabel>
                        <FormControl>
                          <Input placeholder="Full Name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* DOB/DOI */}
                  <FormField
                    control={panForm.control}
                    name="dobOrDoi"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>DOB/DOI (DD/MM/YYYY)</FormLabel>
                        <FormControl>
                          <Input placeholder="DD/MM/YYYY" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Consent */}
                  <FormField
                    control={panForm.control}
                    name="consent"
                    render={({ field }) => (
                      <FormItem className="flex items-center space-x-2">
                        <FormControl>
                          <input
                            type="checkbox"
                            checked={field.value}
                            onChange={(e) => field.onChange(e.target.checked)}
                          />
                        </FormControl>
                        <FormLabel>I give my consent</FormLabel>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button type="submit">Submit</Button>
                </form>
              </Form>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}
