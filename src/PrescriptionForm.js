import React from "react";
//import ReactDOM from 'react-dom';
import "./dashboard/dashboard.css";
//import bgimg from "./img/bgimg.jpg";
//import { Link } from "react-router-dom";
import { Redirect } from "react-router-dom";
import Nav from "./Nav";

class Prescription extends React.Component {
  constructor(props) {
    super(props);
    const token = localStorage.getItem("token");

    let LoggedIn = true;
    if (token == null) {
      LoggedIn = false;
    }
    this.state = {
      email: "",
      password: "",
      token: "",
      LoggedIn,
    };
  }
  render() {
    if (localStorage.getItem("token") == null) {
      return <Redirect to="/" />;
    }
    return (
      <div className="Appcontainer">
        <Nav />
        <div className="prescription_wrap">
          <div className="container">
            <div className="header">
              <h2>Registerd Medical Practitioner's Name</h2>
              <p>Qualification Number</p>
              <p>Address</p>
              <p>Contact Details (Email and Phone Number)</p>
            </div>
            <div className="form-container">
              <form
                style={{
                  height: "50vh",
                }}
              >
                <div className="row">
                  <div className="col5">
                    <div className="form-row">
                      <label>Date of consultation</label>
                      <input type="text" />
                    </div>
                    <div className="form-row">
                      <label>Name of Patient</label>
                      <input type="text" />
                    </div>
                    <div className="form-row">
                      <label>Address</label>
                      <textarea className="ht128"></textarea>
                    </div>
                  </div>
                  <div className="col5">
                    <div className="form-row age">
                      <label>Age</label>
                      <select>
                        <option>N/A</option>
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                        <option>5</option>
                        <option>6</option>
                        <option>7</option>
                        <option>8</option>
                        <option>9</option>
                        <option>10</option>
                        <option>11</option>
                        <option>12</option>
                        <option>13</option>
                        <option>14</option>
                        <option>15</option>
                        <option>16</option>
                        <option>17</option>
                        <option>18</option>
                        <option>19</option>
                        <option>20</option>
                        <option>21</option>
                        <option>22</option>
                        <option>23</option>
                        <option>24</option>
                        <option>25</option>
                        <option>26</option>
                        <option>27</option>
                        <option>28</option>
                        <option>29</option>
                        <option>30</option>
                        <option>31</option>
                        <option>32</option>
                        <option>33</option>
                        <option>34</option>
                        <option>35</option>
                        <option>36</option>
                        <option>37</option>
                        <option>38</option>
                        <option>39</option>
                        <option>40</option>
                        <option>41</option>
                        <option>42</option>
                        <option>43</option>
                        <option>44</option>
                        <option>45</option>
                        <option>46</option>
                        <option>47</option>
                        <option>48</option>
                        <option>49</option>
                        <option>50</option>
                        <option>51</option>
                        <option>52</option>
                        <option>53</option>
                        <option>54</option>
                        <option>55</option>
                        <option>56</option>
                        <option>57</option>
                        <option>58</option>
                        <option>59</option>
                        <option>60</option>
                        <option>61</option>
                        <option>62</option>
                        <option>63</option>
                        <option>64</option>
                        <option>65</option>
                        <option>66</option>
                        <option>67</option>
                        <option>68</option>
                        <option>69</option>
                        <option>70</option>
                        <option>71</option>
                        <option>72</option>
                        <option>73</option>
                        <option>74</option>
                        <option>75</option>
                        <option>76</option>
                        <option>77</option>
                        <option>78</option>
                        <option>79</option>
                        <option>80</option>
                        <option>81</option>
                        <option>82</option>
                        <option>83</option>
                        <option>84</option>
                        <option>85</option>
                        <option>86</option>
                        <option>87</option>
                        <option>88</option>
                        <option>89</option>
                        <option>90</option>
                        <option>91</option>
                        <option>92</option>
                        <option>93</option>
                        <option>94</option>
                        <option>95</option>
                        <option>96</option>
                        <option>97</option>
                        <option>98</option>
                        <option>99</option>
                        <option>100</option>
                      </select>
                      <label>Gender</label>
                      <select>
                        <option></option>
                        <option>Male</option>
                        <option>Female</option>
                      </select>
                    </div>
                    <div className="form-row age">
                      <label>Height</label>
                      <select>
                        <option>N/A</option>
                        <option>30 cm</option>
                        <option>31 cm</option>
                        <option>32 cm</option>
                        <option>33 cm</option>
                        <option>34 cm</option>
                        <option>35 cm</option>
                        <option>36 cm</option>
                        <option>37 cm</option>
                        <option>38 cm</option>
                        <option>39 cm</option>
                        <option>40 cm</option>
                        <option>41 cm</option>
                        <option>42 cm</option>
                        <option>43 cm</option>
                        <option>44 cm</option>
                        <option>45 cm</option>
                        <option>46 cm</option>
                        <option>47 cm</option>
                        <option>48 cm</option>
                        <option>49 cm</option>
                        <option>50 cm</option>
                        <option>51 cm</option>
                        <option>52 cm</option>
                        <option>53 cm</option>
                        <option>54 cm</option>
                        <option>55 cm</option>
                        <option>56 cm</option>
                        <option>57 cm</option>
                        <option>58 cm</option>
                        <option>59 cm</option>
                        <option>60 cm</option>
                        <option>61 cm</option>
                        <option>62 cm</option>
                        <option>63 cm</option>
                        <option>64 cm</option>
                        <option>65 cm</option>
                        <option>66 cm</option>
                        <option>67 cm</option>
                        <option>68 cm</option>
                        <option>69 cm</option>
                        <option>70 cm</option>
                        <option>71 cm</option>
                        <option>72 cm</option>
                        <option>73 cm</option>
                        <option>74 cm</option>
                        <option>75 cm</option>
                        <option>76 cm</option>
                        <option>77 cm</option>
                        <option>78 cm</option>
                        <option>79 cm</option>
                        <option>80 cm</option>
                        <option>81 cm</option>
                        <option>82 cm</option>
                        <option>83 cm</option>
                        <option>84 cm</option>
                        <option>85 cm</option>
                        <option>86 cm</option>
                        <option>87 cm</option>
                        <option>88 cm</option>
                        <option>89 cm</option>
                        <option>90 cm</option>
                        <option>91 cm</option>
                        <option>92 cm</option>
                        <option>93 cm</option>
                        <option>94 cm</option>
                        <option>95 cm</option>
                        <option>96 cm</option>
                        <option>97 cm</option>
                        <option>98 cm</option>
                        <option>99 cm</option>
                        <option>100 cm</option>
                        <option>101 cm</option>
                        <option>102 cm</option>
                        <option>103 cm</option>
                        <option>104 cm</option>
                        <option>105 cm</option>
                        <option>106 cm</option>
                        <option>107 cm</option>
                        <option>108 cm</option>
                        <option>109 cm</option>
                        <option>110 cm</option>
                        <option>111 cm</option>
                        <option>112 cm</option>
                        <option>113 cm</option>
                        <option>114 cm</option>
                        <option>115 cm</option>
                        <option>116 cm</option>
                        <option>117 cm</option>
                        <option>118 cm</option>
                        <option>119 cm</option>
                        <option>120 cm</option>
                        <option>121 cm</option>
                        <option>122 cm</option>
                        <option>123 cm</option>
                        <option>124 cm</option>
                        <option>125 cm</option>
                        <option>126 cm</option>
                        <option>127 cm</option>
                        <option>128 cm</option>
                        <option>129 cm</option>
                        <option>130 cm</option>
                        <option>131 cm</option>
                        <option>132 cm</option>
                        <option>133 cm</option>
                        <option>134 cm</option>
                        <option>135 cm</option>
                        <option>136 cm</option>
                        <option>137 cm</option>
                        <option>138 cm</option>
                        <option>139 cm</option>
                        <option>140 cm</option>
                        <option>141 cm</option>
                        <option>142 cm</option>
                        <option>143 cm</option>
                        <option>144 cm</option>
                        <option>145 cm</option>
                        <option>146 cm</option>
                        <option>147 cm</option>
                        <option>148 cm</option>
                        <option>149 cm</option>
                        <option>150 cm</option>
                        <option>151 cm</option>
                        <option>152 cm</option>
                        <option>153 cm</option>
                        <option>154 cm</option>
                        <option>155 cm</option>
                        <option>156 cm</option>
                        <option>157 cm</option>
                        <option>158 cm</option>
                        <option>159 cm</option>
                        <option>160 cm</option>
                        <option>161 cm</option>
                        <option>162 cm</option>
                        <option>163 cm</option>
                        <option>164 cm</option>
                        <option>165 cm</option>
                        <option>166 cm</option>
                        <option>167 cm</option>
                        <option>168 cm</option>
                        <option>169 cm</option>
                        <option>170 cm</option>
                        <option>171 cm</option>
                        <option>172 cm</option>
                        <option>173 cm</option>
                        <option>174 cm</option>
                        <option>175 cm</option>
                        <option>176 cm</option>
                        <option>177 cm</option>
                        <option>178 cm</option>
                        <option>179 cm</option>
                        <option>180 cm</option>
                        <option>181 cm</option>
                        <option>182 cm</option>
                        <option>183 cm</option>
                        <option>184 cm</option>
                        <option>185 cm</option>
                        <option>186 cm</option>
                        <option>187 cm</option>
                        <option>188 cm</option>
                        <option>189 cm</option>
                        <option>190 cm</option>
                        <option>191 cm</option>
                        <option>192 cm</option>
                        <option>193 cm</option>
                        <option>194 cm</option>
                        <option>195 cm</option>
                        <option>196 cm</option>
                        <option>197 cm</option>
                        <option>198 cm</option>
                        <option>199 cm</option>
                        <option>200 cm</option>
                        <option>201 cm</option>
                        <option>202 cm</option>
                        <option>203 cm</option>
                        <option>204 cm</option>
                        <option>205 cm</option>
                        <option>206 cm</option>
                        <option>207 cm</option>
                        <option>208 cm</option>
                        <option>209 cm</option>
                        <option>210 cm</option>
                        <option>211 cm</option>
                        <option>212 cm</option>
                        <option>213 cm</option>
                        <option>214 cm</option>
                        <option>215 cm</option>
                        <option>216 cm</option>
                        <option>217 cm</option>
                        <option>218 cm</option>
                        <option>219 cm</option>
                        <option>220 cm</option>
                        <option>221 cm</option>
                        <option>222 cm</option>
                        <option>223 cm</option>
                        <option>224 cm</option>
                        <option>225 cm</option>
                        <option>226 cm</option>
                        <option>227 cm</option>
                        <option>228 cm</option>
                        <option>229 cm</option>
                      </select>
                      <label>weight</label>
                      <select>
                        <option>N/A</option>
                        <option>1 Kg</option>
                        <option>2 Kg</option>
                        <option>3 Kg</option>
                        <option>4 Kg</option>
                        <option>5 Kg</option>
                        <option>6 Kg</option>
                        <option>7 Kg</option>
                        <option>8 Kg</option>
                        <option>9 Kg</option>
                        <option>10 Kg</option>
                        <option>11 Kg</option>
                        <option>12 Kg</option>
                        <option>13 Kg</option>
                        <option>14 Kg</option>
                        <option>15 Kg</option>
                        <option>16 Kg</option>
                        <option>17 Kg</option>
                        <option>18 Kg</option>
                        <option>19 Kg</option>
                        <option>20 Kg</option>
                        <option>21 Kg</option>
                        <option>22 Kg</option>
                        <option>23 Kg</option>
                        <option>24 Kg</option>
                        <option>25 Kg</option>
                        <option>26 Kg</option>
                        <option>27 Kg</option>
                        <option>28 Kg</option>
                        <option>29 Kg</option>
                        <option>30 Kg</option>
                        <option>31 Kg</option>
                        <option>32 Kg</option>
                        <option>33 Kg</option>
                        <option>34 Kg</option>
                        <option>35 Kg</option>
                        <option>36 Kg</option>
                        <option>37 Kg</option>
                        <option>38 Kg</option>
                        <option>39 Kg</option>
                        <option>40 Kg</option>
                        <option>41 Kg</option>
                        <option>42 Kg</option>
                        <option>43 Kg</option>
                        <option>44 Kg</option>
                        <option>45 Kg</option>
                        <option>46 Kg</option>
                        <option>47 Kg</option>
                        <option>48 Kg</option>
                        <option>49 Kg</option>
                        <option>50 Kg</option>
                        <option>51 Kg</option>
                        <option>52 Kg</option>
                        <option>53 Kg</option>
                        <option>54 Kg</option>
                        <option>55 Kg</option>
                        <option>56 Kg</option>
                        <option>57 Kg</option>
                        <option>58 Kg</option>
                        <option>59 Kg</option>
                        <option>60 Kg</option>
                        <option>61 Kg</option>
                        <option>62 Kg</option>
                        <option>63 Kg</option>
                        <option>64 Kg</option>
                        <option>65 Kg</option>
                        <option>66 Kg</option>
                        <option>67 Kg</option>
                        <option>68 Kg</option>
                        <option>69 Kg</option>
                        <option>70 Kg</option>
                        <option>71 Kg</option>
                        <option>72 Kg</option>
                        <option>73 Kg</option>
                        <option>74 Kg</option>
                        <option>75 Kg</option>
                        <option>76 Kg</option>
                        <option>77 Kg</option>
                        <option>78 Kg</option>
                        <option>79 Kg</option>
                        <option>80 Kg</option>
                        <option>81 Kg</option>
                        <option>82 Kg</option>
                        <option>83 Kg</option>
                        <option>84 Kg</option>
                        <option>85 Kg</option>
                        <option>86 Kg</option>
                        <option>87 Kg</option>
                        <option>88 Kg</option>
                        <option>89 Kg</option>
                        <option>90 Kg</option>
                        <option>91 Kg</option>
                        <option>92 Kg</option>
                        <option>93 Kg</option>
                        <option>94 Kg</option>
                        <option>95 Kg</option>
                        <option>96 Kg</option>
                        <option>97 Kg</option>
                        <option>98 Kg</option>
                        <option>99 Kg</option>
                        <option>100 Kg</option>
                        <option>101 Kg</option>
                        <option>102 Kg</option>
                        <option>103 Kg</option>
                        <option>104 Kg</option>
                        <option>105 Kg</option>
                        <option>106 Kg</option>
                        <option>107 Kg</option>
                        <option>108 Kg</option>
                        <option>109 Kg</option>
                        <option>110 Kg</option>
                        <option>111 Kg</option>
                        <option>112 Kg</option>
                        <option>113 Kg</option>
                        <option>114 Kg</option>
                        <option>115 Kg</option>
                        <option>116 Kg</option>
                        <option>117 Kg</option>
                        <option>118 Kg</option>
                        <option>119 Kg</option>
                        <option>120 Kg</option>
                        <option>121 Kg</option>
                        <option>122 Kg</option>
                        <option>123 Kg</option>
                        <option>124 Kg</option>
                        <option>125 Kg</option>
                        <option>126 Kg</option>
                        <option>127 Kg</option>
                        <option>128 Kg</option>
                        <option>129 Kg</option>
                        <option>130 Kg</option>
                        <option>131 Kg</option>
                        <option>132 Kg</option>
                        <option>133 Kg</option>
                        <option>134 Kg</option>
                        <option>135 Kg</option>
                        <option>136 Kg</option>
                        <option>137 Kg</option>
                        <option>138 Kg</option>
                        <option>139 Kg</option>
                        <option>140 Kg</option>
                        <option>141 Kg</option>
                        <option>142 Kg</option>
                        <option>143 Kg</option>
                        <option>144 Kg</option>
                        <option>145 Kg</option>
                        <option>146 Kg</option>
                        <option>147 Kg</option>
                        <option>148 Kg</option>
                        <option>149 Kg</option>
                        <option>150 Kg</option>
                        <option>151 Kg</option>
                        <option>152 Kg</option>
                        <option>153 Kg</option>
                        <option>154 Kg</option>
                        <option>155 Kg</option>
                        <option>156 Kg</option>
                        <option>157 Kg</option>
                        <option>158 Kg</option>
                        <option>159 Kg</option>
                        <option>160 Kg</option>
                        <option>161 Kg</option>
                        <option>162 Kg</option>
                        <option>163 Kg</option>
                        <option>164 Kg</option>
                        <option>165 Kg</option>
                        <option>166 Kg</option>
                        <option>167 Kg</option>
                        <option>168 Kg</option>
                        <option>169 Kg</option>
                        <option>170 Kg</option>
                        <option>171 Kg</option>
                        <option>172 Kg</option>
                        <option>173 Kg</option>
                        <option>174 Kg</option>
                        <option>175 Kg</option>
                        <option>176 Kg</option>
                        <option>177 Kg</option>
                        <option>178 Kg</option>
                        <option>179 Kg</option>
                        <option>180 Kg</option>
                        <option>181 Kg</option>
                        <option>182 Kg</option>
                        <option>183 Kg</option>
                        <option>184 Kg</option>
                        <option>185 Kg</option>
                        <option>186 Kg</option>
                        <option>187 Kg</option>
                        <option>188 Kg</option>
                        <option>189 Kg</option>
                        <option>190 Kg</option>
                        <option>191 Kg</option>
                        <option>192 Kg</option>
                        <option>193 Kg</option>
                        <option>194 Kg</option>
                        <option>195 Kg</option>
                        <option>196 Kg</option>
                        <option>197 Kg</option>
                        <option>198 Kg</option>
                        <option>199 Kg</option>
                        <option>200 Kg</option>
                      </select>
                    </div>

                    <div className="form-row ht">
                      <label>LMP</label>
                      <input type="text" />
                    </div>
                  </div>
                </div>
              </form>
            </div>
            <div className="border-top"></div>
            <div className="tablecontent">
              <div className="row">
                <div className="col4">
                  <h3>Chif Complants</h3>
                  <h3>Chif Complants</h3>
                  <h3>Chif Complants</h3>
                  <h3>Chif Complants</h3>
                </div>
                <div className="col6">
                  <h3>Diagnoss Or Provisional Diaghosis</h3>
                  <input
                    type="text"
                    placeholder="Enter your text here"
                    className="editsect"
                  />
                  <input
                    type="text"
                    placeholder="Enter your text here"
                    className="editsect"
                  />
                  <input
                    type="text"
                    placeholder="Enter your text here"
                    className="editsect"
                  />
                </div>
              </div>
            </div>
            <div className="border-bottom"></div>
            <div className="spnotification">
              <p>Special Instructions</p>
              <textarea className="spcins" placeholder="Special instructions">
                {" "}
              </textarea>
            </div>
            <div className="stampsign">
              <p>RMPs Signature & Stamp</p>
            </div>
            <button
              style={{
                width: "6em",
                height: "2em",
                fontWeight: "bold",
                fontSize: "1em",
                color: "black",
                backgroundColor: "green",
              }}
            >
              Submit
            </button>
            <div className="border-bottom"></div>
            <div className="footer1">
              <p>Lorem Ipsum is simply dummy text of the printing </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default Prescription;
