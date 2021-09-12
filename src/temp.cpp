  
#include<bits/stdc++.h>

using namespace std;
#define S 7
float mindp[25][25];
float maxdp[25][25];

int minS[25][25];
int maxS[25][25];

vector<int> num;
vector<char> opr;

void printMax(int i,int j){
    if(i==j)
    {
        cout<<num[i];    
    }

    else
    { 
        cout<<"(";
        printMax(i,maxS[i][j]);
        cout<<opr[maxS[i][j]];
        printMax(maxS[i][j]+1,j);
        cout<<")";
    }
}
void printMin(int i,int j){
    if(i==j)
    cout<<num[i];
    else{ cout<<"(";
        printMin(i,minS[i][j]);
        cout<<opr[minS[i][j]];
        printMin(minS[i][j]+1,j);
        cout<<")";
    }
}
bool compare_float(float x, float y){
   if(fabs(x - y) < 0.0001f)
      return true; //they are same
      return false; //they are not same
}
void print(int i,int j, bool direction){
    int k;
    char o;
    float s;

    if(i==j){
        cout<<num[i];
        return;
    }

    if(direction==0){
        s = mindp[i][j];
        k = minS[i][j];
        o = opr[minS[i][j]];
    }else{
        s = maxdp[i][j];
        k = maxS[i][j];
        o = opr[maxS[i][j]];
    }  
    
        float x = mindp[i][k], y = mindp[k+1][j];
        float a = maxdp[i][k], b = maxdp[k+1][j];
        if(o=='+'){
            cout<<"(";
            if(compare_float(x+y,s)){
                print(i,k, 0);
                cout<<o;
                print(k+1,j,0);
            }else if(compare_float(a+b,s)){
                // cout<<"Inside";

                print(i,k, 1);
                cout<<o;
                print(k+1,j,1);
            }else if(compare_float(x+b,s)){
                print(i,k, 0);
                cout<<o;
                print(k+1,j,1);
            }else if(compare_float(a+y,s)){
                print(i,k, 1);
                cout<<o;
                print(k+1,j,0);
            }
            cout<<")";
        }
        else if(o=='-'){
            cout<<"(";
            if(compare_float(x-y,s)){
                print(i,k, 0);
                cout<<o;
                print(k+1,j,0);
            }else if(compare_float(a-b,s)){
                // cout<<"Inside";

                print(i,k, 1);
                cout<<o;
                print(k+1,j,1);
            }else if(compare_float(x-b,s)){
                print(i,k, 0);
                cout<<o;
                print(k+1,j,1);
            }else if(compare_float(a-y,s)){
                print(i,k, 1);
                cout<<o;
                print(k+1,j,0);
            } 
            cout<<")";  
        }else if(o=='*'){
            // cout<<" S is: "<<s<<endl;
            // cout<<"k is: "<<k<<" i is: "<<i<<" j is: "<<j<<endl;
            // cout<<"x is: "<<x<<" y is: "<<y<<" a is: "<<a<<" b is: "<<b<<endl;
            // cout<<"x/y is: "<<x*y<<" a/b is: "<<a*b<<" x/b is: "<<x*b<<" a/y is: "<<a*y<<endl;
            cout<<"(";
            if(compare_float(x*y,s)){
                print(i,k, 0);
                cout<<o;
                print(k+1,j,0);
            }else if(compare_float(a*b,s)){
                // cout<<"Inside";

                print(i,k, 1);
                cout<<o;
                print(k+1,j,1);
            }else if(compare_float(x*b,s)){
                print(i,k, 0);
                cout<<o;
                print(k+1,j,1);
            }else if(compare_float(a*y,s)){
                print(i,k, 1);
                cout<<o;
                print(k+1,j,0);
            }
            cout<<")"; 
        }else if(o=='/'){
            cout<<"(";
            if(compare_float(x/y,s)){
                print(i,k, 0);
                cout<<o;
                print(k+1,j,0);
            }else if(compare_float(a/b,s)){
                // cout<<"Inside";

                print(i,k, 1);
                cout<<o;
                print(k+1,j,1);
            }else if(compare_float(x/b,s)){
                print(i,k, 0);
                cout<<o;
                print(k+1,j,1);
            }else if(compare_float(a/y,s)){
                print(i,k, 1);
                cout<<o;
                print(k+1,j,0);
            }   
            cout<<")";  
        }
}

bool isOperator(char op)
{
    return (op == '+' || op == '*' || op == '-' || op == '/');
}
void matrixchain(string expression){
    num.clear();
    opr.clear();
    string tmp = "";
    //  store operator and numbers in different vectors
    for (int i = 0; i < expression.length(); i++)
    {
        if (isOperator(expression[i]))
        {
            opr.push_back(expression[i]);
            num.push_back(atoi(tmp.c_str()));
            tmp = "";
        }
        else
        {
            tmp += expression[i];
        }
    }
    //  storing last number in vector
    num.push_back(atoi(tmp.c_str()));
 
    int len = num.size();

    //  initializing minval and maxval 2D array
    for (int i = 0; i < len; i++)
    {
        for (int j = 0; j < len; j++)
        {
            mindp[i][j] = INT_MAX;
            maxdp[i][j] = INT_MIN;
            maxS[i][j] = 0;
            minS[i][j] = 0;
            //  initializing main diagonal by num values
            if (i == j)
                mindp[i][j] = maxdp[i][j] = num[i];
        }
    }
 
    // looping similar to matrix chain multiplication
    // and updating both 2D arrays
    for (int L = 2; L <= len; L++)
    {
        for (int i = 0; i < len - L + 1; i++)
        {
            int j = i + L - 1;
            for (int k = i; k < j; k++)
            {
                float minTmp = 0, maxTmp = 0;
                float x = mindp[i][k], y = mindp[k+1][j];
                float a = maxdp[i][k], b = maxdp[k+1][j];
                if(opr[k] == '+')
                {                  
                    maxTmp = max(x + y, max(a+b, max(x+b, a+y)));
                    minTmp = min(x + y, min(a+b, min(x+b, a+y)));                    
                }

                else if(opr[k] == '*')
                {
                    // minTmp = mindp[i][k] * mindp[k + 1][j];
                    // maxTmp = maxdp[i][k] * maxdp[k + 1][j];
                    minTmp = min(x*y, min(a*b, min(x*b, a*y)));
                    maxTmp = max(x*y, max(a*b, max(x*b, a*y)));
                }
                else if(opr[k] == '-')
                {
                    maxTmp = max(x - y, max(a-b, max(x-b, a-y)));
                    minTmp = min(x - y, min(a-b, min(x-b, a-y)));
                }
                else if(opr[k]=='/'){
                    minTmp = min(x/y, min(a/b, min(x/b, a/y)));
                    maxTmp = max(x/y, max(a/b, max(x/b, a/y)));    
                }
                if (minTmp < mindp[i][j]){
                    mindp[i][j] = minTmp;
                    minS[i][j] = k;
                }
                if (maxTmp >= maxdp[i][j]){
                    maxdp[i][j] = maxTmp;
                    maxS[i][j] = k;
                }
            }
        }
    }
    //computation part end
    //starting of display part
    cout<<"\nMinimum number of multiplication: "<<mindp[0][len-1]<<"\n";
    cout<<"MIN PARENTHESIZATION IS: \n";
    print(0,len-1,0);
    cout<<"\nMaximum number of multiplication: "<<maxdp[0][len-1]<<"\n";
    cout<<"MAX PARENTHESIZATION IS: \n";
    print(0,len-1,1);   
   
}

int main(){
    string expression = "1-2/3+4*5";
    matrixchain(expression);
    return 0;
}